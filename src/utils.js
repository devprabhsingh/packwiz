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

      myRate = {
        price: shippingPrice,
        courierName: "Packwiz Delivery",
        deliveryTime: "1-2 days",
      };
    }

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

    var lowestPriceRate1 = null;
    var lowestPriceRate2 = null;

    // Step 1: Find the lowest rate for each unique courier
    const lowestRatePerCourier = new Map();
    data.rates.forEach((rate) => {
      const courierName = rate.courier_service?.name;
      const price = rate.total_charge;

      if (courierName) {
        // Ensure courierName exists
        if (
          !lowestRatePerCourier.has(courierName) ||
          price < lowestRatePerCourier.get(courierName).total_charge
        ) {
          lowestRatePerCourier.set(courierName, rate);
        }
      }
    });

    // Step 2: Convert to array and sort by price
    const uniqueCourierRates = Array.from(lowestRatePerCourier.values());
    const sortedUniqueCourierRates = uniqueCourierRates.sort(
      (a, b) => a.total_charge - b.total_charge
    );

    // Step 3: Get the absolute lowest rate (lowestPriceRate1)
    const rawLowestRate1 = sortedUniqueCourierRates[0];

    if (rawLowestRate1) {
      lowestPriceRate1 = {
        courierName: rawLowestRate1.courier_service?.name || "N/A",
        serviceName: rawLowestRate1.courier_service?.service_type || "N/A",
        price: rawLowestRate1.total_charge,
        deliveryTime: `${rawLowestRate1.max_delivery_time} days`,
      };

      // Step 4: Find the second lowest rate with a DIFFERENT (and preferably higher) price
      // Iterate through the sorted list to find the first rate whose price is higher than rawLowestRate1's price.
      let rawLowestRate2Candidate = null;
      for (let i = 1; i < sortedUniqueCourierRates.length; i++) {
        const currentRate = sortedUniqueCourierRates[i];

        if (currentRate.total_charge > rawLowestRate1.total_charge) {
          rawLowestRate2Candidate = currentRate;
          break; // Found our second distinct-price rate
        }
      }

      if (rawLowestRate2Candidate) {
        lowestPriceRate2 = {
          courierName: rawLowestRate2Candidate.courier_service?.name || "N/A",
          serviceName:
            rawLowestRate2Candidate.courier_service?.service_type || "N/A",
          price: rawLowestRate2Candidate.total_charge,
          deliveryTime: `${rawLowestRate2Candidate.max_delivery_time} days`,
          // originalRate: rawLowestRate2Candidate,
        };
      }
    }

    return [myRate, lowestPriceRate1, lowestPriceRate2];
  } catch (error) {
    console.error("Error in getShipCharge:", error);
    return [];
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
