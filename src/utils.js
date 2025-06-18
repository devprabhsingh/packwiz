import mongoose from "mongoose";
let isConnected = false;
import { categories } from "./data/numberSheet";

export function getProductCat(productId) {
  if (!productId) return null;

  if (productId.startsWith("bx")) {
    return 0;
  } else if (productId.startsWith("mb")) {
    return 1;
  } else if (productId.startsWith("sw")) {
    return 2;
  } else if (productId.startsWith("gl")) {
    return 3;
  } else if (productId.startsWith("ct")) {
    return 4;
  } else if (productId.startsWith("gt")) {
    return 5;
  } else if (productId.startsWith("rt")) {
    return 6;
  } else if (productId.startsWith("gb")) {
    return 7;
  } else if (productId.startsWith("cv")) {
    return 8;
  } else if (productId.startsWith("fp")) {
    return 9;
  } else if (productId.startsWith("np")) {
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
function getTotalWeightDim(cartItems) {
  if (!cartItems || cartItems.length === 0) return {};

  const items = cartItems.map((cItem) => {
    const item = categories[getProductCat(cItem.id)];
    return { ...item, ...cItem };
  });

  let finalConfig = {};
  if (items.length === 1) {
    const item = items[0];
    const { id, qty } = item;
    const d = item.dimensions?.[item.id] || item.dimensions || {};

    const config1 = { l: d.l * qty, w: d.w, h: d.h };
    const config2 = { l: d.l, w: d.w * qty, h: d.h };
    const config3 = { l: d.l, w: d.w, h: d.h * qty };

    const idChar = id.slice(0, 2);
    switch (idChar) {
      case "bx":
        finalConfig = {
          l: d.l,
          w: d.w,
          h: (d.h * qty).toFixed(2),
        };
        break;

      case "mb":
      case "cv":
      case "fp":
      case "np":
        finalConfig = config3;
        break;

      case "sw":
        if (qty <= 2) finalConfig = config2;
        else if (qty <= 4) finalConfig = { l: 15, w: 10, h: 10 };
        else if (qty <= 6) finalConfig = { l: 15, w: 10, h: 15 };
        else finalConfig = { l: 15, w: 10 * qty, h: 15 };
        break;

      case "gl":
        if (qty <= 2) finalConfig = { l: 9, w: 4.7, h: 3.1 * qty };
        else if (qty <= 4) finalConfig = { l: 9, w: 9.4, h: 6.2 };
        else if (qty <= 6) finalConfig = { l: 9, w: 9.4, h: 9.3 };
        else finalConfig = { l: 9, w: 9.4, h: 3.1 * qty };
        break;

      case "ct":
      case "gt":
      case "rt":
        finalConfig = qty <= 6 ? config3 : { l: 5, w: 5 * qty, h: 12 };
        break;

      default:
        console.warn("No matching config rule for title:", title);
        finalConfig = {};
    }

    let weight = item.weight;
    let dims = item.dimensions;
    if (item.id.slice(0, 2) === "bx") {
      weight = weight[item.id];
      dims = dims[item.id];
    }

    return [
      {
        box: {
          length: Number(finalConfig.l),
          width: Number(finalConfig.w),
          height: Number(finalConfig.h),
          slug: "Custom",
        },
        items: items.map((item) => {
          return {
            contains_battery_pi966: false,
            contains_battery_pi967: false,
            contains_liquids: false,
            origin_country_alpha2: "CA",
            quantity: item.qty,
            declared_currency: "CAD",
            description: item.title,
            declared_customs_value: item.qty * item.price,
            hs_code: item.hsCode,
            category: item.cat.slice(0, 48),
            actual_weight: Number(weight.toFixed(2)),

            // dimensions: {
            //   length: dims.l,
            //   width: dims.w,
            //   height: dims.h,
            // },
          };
        }),
      },
    ];
  } else {
    const groupA = [];
    const groupB = [];

    items.forEach((item) => {
      const group = getItemGroup(item.id, item.qty);
      if (group === "A") {
        groupA.push(item);
      } else {
        groupB.push(item);
      }
    });

    // calculate entire weight of group A
    let totalWeightA = groupA.reduce(
      (sum, item) => sum + item.weight * item.qty,
      0
    );

    if (totalWeightA > 30) {
      // Sort groupA by descending total item weight (weight * qty)
      groupA.sort((a, b) => b.weight * b.qty - a.weight * a.qty);
      while (totalWeightA > 30 && groupA.length > 0) {
        const heavyItem = groupA.shift(); // remove from A
        groupB.push(heavyItem); // add to B
        totalWeightA -= heavyItem.weight * heavyItem.qty;
      }
    }

    const groupAParcel = [
      {
        items: groupA.map((item) => {
          return {
            contains_battery_pi966: false,
            contains_battery_pi967: false,
            contains_liquids: false,
            origin_country_alpha2: "CA",
            quantity: item.qty,
            declared_currency: "CAD",
            description: item.title,
            declared_customs_value: item.qty * item.price,
            hs_code: item.hsCode,
            category: item.cat.slice(0, 48),
            actual_weight: Number((item.qty * item.weight).toFixed(2)),
            dimensions: {
              length: item.dimensions.l,
              width: item.dimensions.w,
              height: item.dimensions.h,
            },
          };
        }),
      },
    ];
    console.log("groupAParcel", groupAParcel);
    const groupBItems = groupB.map((item) => {
      return {
        contains_battery_pi966: false,
        contains_battery_pi967: false,
        contains_liquids: false,
        origin_country_alpha2: "CA",
        quantity: item.qty,
        declared_currency: "CAD",
        description: item.title,
        declared_customs_value: item.qty * item.price,
        hs_code: item.hsCode,
        category: item.cat.slice(0, 48),
        actual_weight: Number((item.qty * item.weight).toFixed(2)),
        dimensions: {
          length: item.dimensions.l,
          width: item.dimensions.w,
          height: item.dimensions.h,
        },
      };
    });
    console.log("groupB", groupBItems);
    return;
  }
  const parcels = [
    {
      items: items.map((item) => {
        return {
          contains_battery_pi966: false,
          contains_battery_pi967: false,
          contains_liquids: false,
          origin_country_alpha2: "CA",
          quantity: item.qty,
          declared_currency: "CAD",
          description: item.title,
          declared_customs_value: item.qty * item.price,
          hs_code: item.hsCode,
          category: item.cat.slice(0, 48),
          actual_weight: Number((item.qty * item.weight).toFixed(2)),
        };
      }),
    },
  ];
}

function getItemGroup(itemId, qty) {
  const prefix = itemId.slice(0, 2);

  switch (prefix) {
    case "gl":
      return qty > 20 ? "B" : "A";

    case "ct":
    case "gt":
    case "rt":
      return qty >= 36 ? "B" : "A";

    case "cv":
      return qty > 20 ? "B" : "A";

    case "sw":
      return qty > 6 ? "B" : "A";

    case "mb":
      return qty <= 5 ? "A" : "B";

    case "bx":
    case "np":
    case "fp":
      return "B"; // Always bulky

    default:
      return "A"; // Default to groupable
  }
}

export async function getShipCharge(a, subtotal, cartItems) {
  const parcels = await getTotalWeightDim(cartItems);
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
      shipping_settings: { units: { weight: "kg", dimensions: "in" } },
      parcels: parcels,
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

export async function getTaxRate(province) {
  switch (province) {
    case "Alberta":
    case "Yukon":
    case "Nunavut":
    case "Northwest Territories":
      return 0.05;
    case "British Columbia":
    case "Manitoba":
      return 0.12;
    case "Saskatchewan":
      return 0.11;
    case "Quebec":
      return 0.14975;
    case "Ontario":
      return 0.13;
    case "New Brunswick":
    case "Newfoundland & Labrador":
    case "Prince Edward Island":
      return 0.15;
    case "Nova Scotia":
      return 0.14;

    default:
      return 0;
  }
}
