import mongoose from "mongoose";
let isConnected = false;

export function getProductCat(productId) {
  if (!productId) return null;

  if (productId.startsWith("b")) {
    return 0;
  } else if (productId.startsWith("s")) {
    return 1;
  } else if (productId.startsWith("m")) {
    return 2;
  } else if (productId.startsWith("g")) {
    return 3;
  } else if (productId.startsWith("ct")) {
    return 4;
  } else if (productId.startsWith("gt")) {
    return 5;
  } else if (productId.startsWith("rt")) {
    return 6;
  } else if (productId.startsWith("gb")) {
    return 7;
  } else if (productId.startsWith("c")) {
    return 8;
  } else if (productId.startsWith("f")) {
    return 9;
  } else if (productId.startsWith("n")) {
    return 10;
  } else {
    return null; // or -1 if you want to handle unknown cases
  }
}

export async function getAddresses(query) {
  const accessToken =
    "pk.eyJ1IjoicHJhYmgwMiIsImEiOiJja3ZpczV1Y2oydnkwMm9zMWllbjNhZHZ2In0.kU1X_il6kErpHzZxZB1I9Q"; // safer: store token in .env
  const mapboxUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    query
  )}&country=ca&language=en&proximity=ip&access_token=${accessToken}`;

  const mapboxRes = await fetch(mapboxUrl);
  const mapboxData = await mapboxRes.json();

  return mapboxData.features;
}

export async function getShipCharge(a, subtotal) {
  const startLon = -79.674004;
  const startLat = 43.775972;

  const torontoAreas = [
    "toronto",
    "etobicoke",
    "scarborough",
    "north york",
    "east york",
    "york",
  ];

  // Extract city name info from a.properties.full_address
  const fullAddress = a.properties?.full_address || "";
  const aLower = fullAddress.toLowerCase();
  const isToronto = torontoAreas.some((area) => aLower.includes(area));

  // Use coordinates from the feature directly
  const [destLon, destLat] = a.geometry.coordinates;

  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLon},${startLat};${destLon},${destLat}?alternatives=false&exclude=toll&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoicHJhYmgwMiIsImEiOiJja3ZpczV1Y2oydnkwMm9zMWllbjNhZHZ2In0.kU1X_il6kErpHzZxZB1I9Q`;

  try {
    const directionsRes = await fetch(directionsUrl);
    const directionsData = await directionsRes.json();

    if (!directionsData.routes || directionsData.routes.length === 0) {
      throw new Error("No route found");
    }

    const { distance, duration } = directionsData.routes[0];
    const distanceInKm = distance / 1000;

    let myRate = null;

    // Condition 1: Only fetch your own rate if within 120 km
    if (distanceInKm <= 120) {
      let shippingPrice = 0;

      if (isToronto) {
        shippingPrice = subtotal >= 50 ? 1 : distanceInKm * 0.7;
      } else {
        shippingPrice = distanceInKm * 0.5;
      }

      shippingPrice = Math.round(shippingPrice * 100) / 100;

      myRate = shippingPrice;
    }

    // Always fetch EasyShip if within 150 km
    if (distanceInKm <= 150) {
      const requestBody = {
        origin_address: {
          line_1: "15 gore valley trail",
          state: "Ontario",
          city: "Brampton",
          postal_code: "L6P1N7",
        },
        destination_address: {
          country_alpha2: "CA",
          line_1: a.properties.context.address.name || "",
          state: a.properties.context.region.name || "",
          city: a.properties.context.place.name || "",
          postal_code: a.properties.context.postcode.name || "",
        },
        incoterms: "DDU",
        insurance: { is_insured: false },
        courier_settings: {
          show_courier_logo_url: false,
          apply_shipping_rules: true,
        },
        shipping_settings: { units: { weight: "kg", dimensions: "cm" } },
        parcels: [
          {
            box: { length: 20, width: 20, height: 20, slug: "Custom" },
            items: [
              {
                contains_battery_pi966: false,
                contains_battery_pi967: false,
                contains_liquids: false,
                origin_country_alpha2: "CA",
                quantity: 1,
                declared_currency: "CAD",
                description: "shrink wrap",
                declared_customs_value: 10,
                hs_code: "121233",
                category: "sart",
              },
            ],
            total_actual_weight: 20,
          },
        ],
      };

      const easyshipResponse = await fetch(
        "https://public-api.easyship.com/2024-09/rates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer sand_3IBeyOtZq2RIkmilxofOR5bfe2UZVNGUFIQyfhc9vmw=`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await easyshipResponse.json();
      console.log(data);
      var lowestPriceRate = null;
      var fastestDeliveryRate = null;

      if (data.rates && data.rates.length > 0) {
        // Find the lowest price rate by sorting by total_charge
        const sortedByPrice = [...data.rates].sort(
          (a, b) => a.total_charge - b.total_charge
        );
        const rawLowestPriceRate = sortedByPrice[0];

        // Find the fastest delivery rate by sorting by min_delivery_time
        const sortedByDeliveryTime = [...data.rates].sort(
          (a, b) => a.min_delivery_time - b.min_delivery_time
        );
        const rawFastestDeliveryRate = sortedByDeliveryTime[0];

        if (rawLowestPriceRate) {
          lowestPriceRate = {
            courierName: rawLowestPriceRate.courier_service?.name || "N/A",
            serviceName:
              rawLowestPriceRate.courier_service?.service_type || "N/A",
            totalCharge: rawLowestPriceRate.total_charge,
            deliveryTime: `${rawLowestPriceRate.min_delivery_time}-${rawLowestPriceRate.max_delivery_time} days`,
          };
        }

        // Map to desired concise format for fastest delivery rate
        if (rawFastestDeliveryRate) {
          fastestDeliveryRate = {
            courierName: rawFastestDeliveryRate.courier_service?.name || "N/A",
            serviceName:
              rawFastestDeliveryRate.courier_service?.service_type || "N/A",
            totalCharge: rawFastestDeliveryRate.total_charge,
            deliveryTime: `${rawFastestDeliveryRate.min_delivery_time}-${rawFastestDeliveryRate.max_delivery_time} days`,
          };
        }
      }
    }

    return {
      myRate, // Will be null if >120km
      lowestPriceRate: lowestPriceRate,
      fastestDeliveryRate: fastestDeliveryRate,
    };
  } catch (error) {
    console.error("Error in getShipCharge:", error);
    return {
      myRate: null,
      lowestPriceRate: {},
      fastestDeliveryRate: {},
      error: true,
      message: error.message,
    };
  }
}

export async function dbConnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "packwiz",
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
