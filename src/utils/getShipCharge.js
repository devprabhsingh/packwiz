import categories from "../data/categories";
import { getProductCat } from "./getProductCat";

function getPrice(distance, subtotal, cartItems, state) {
  const items = cartItems.map((cItem) => {
    // Ensure categories and getProductCat are defined and accessible
    const itemData = categories[getProductCat(cItem.id)];
    return { ...itemData, ...cItem }; // Merge category data with cart item data
  });

  const totalWeight = items.reduce((sum, item) => {
    let itemWeight =
      typeof item.weight === "object" ? item.weight[item.id] : item.weight;

    const quantity = item.qty || 1;

    return sum + Number(itemWeight) * quantity;
  }, 0);

  const atlantic = [
    "New Brunswick",
    "Nova Scotia",
    "Prince Edward Island",
    "Newfoundland and Labrador",
  ];
  const territories = ["Yukon", "Northwest Territories", "Nunavut"];
  const western = ["British Columbia", "Alberta", "Saskatchewan", "Manitoba"];
  let shipRate = 0;

  if (territories.includes(state)) {
    if (subtotal > 500) {
      shipRate = 100;
    } else if (subtotal > 100) {
      shipRate = 50;
    } else {
      shipRate = 40;
    }
  } else if (atlantic.includes(state)) {
    if (subtotal > 500) {
      shipRate = 100;
    } else if (subtotal > 100) {
      shipRate = 50;
    } else {
      shipRate = 30;
    }
  } else if (state === "Ontario") {
    if (subtotal >= 500) {
      shipRate = 0;
    } else if (subtotal >= 300) {
      shipRate = distance > 100 ? 20 : 0;
    } else if (distance > 200) {
      shipRate = 20 + Number((distance * 0.04).toFixed(2));
    } else if (distance > 50) {
      shipRate = 20 + Number((distance * 0.1).toFixed(2));
    } else if (distance > 25) {
      shipRate = 15;
    } else {
      shipRate = 10;
    }
  } else {
    if (subtotal > 500) {
      shipRate = 100;
    } else if (subtotal > 100) {
      shipRate = 50;
    } else {
      shipRate = 30;
    }
  }

  console.log(totalWeight);
  //  Add weight surcharge if needed
  if (atlantic.includes(state)) {
    shipRate += 0.4 * totalWeight;
  } else if (territories.includes(state)) {
    shipRate += 0.5 * totalWeight;
  } else if (western.includes(state)) {
    shipRate += 0.2 * totalWeight;
  } else {
    shipRate += 0.1 * totalWeight;
  }

  if (totalWeight > 21) {
    shipRate = shipRate * 2;
  } else if (totalWeight > 12) [(shipRate = shipRate * 1.4)];

  shipRate = Number(shipRate.toFixed(2));

  // Calculate delivery time
  let dTime = "1-2 days";
  let cod = true;
  if (distance > 60) {
    dTime = "3-8 days";
    cod = false;
  }

  if (dTime === "1-2 days") {
    return [
      {
        price: shipRate,
        deliveryTime: dTime,
        cod: cod,
        shipService: "Standard",
      },
    ];
  } else {
    return [
      {
        price: shipRate,
        deliveryTime: dTime,
        cod: cod,
        shipService: "Standard",
      },
      {
        price: shipRate + 20,
        deliveryTime: "1-3 days",
        cod: cod,
        shipService: "Express",
      },
    ];
  }
}
export async function getShipCharge(a, subtotal, cartItems) {
  const startLon = -79.674004; // Brampton, ON
  const startLat = 43.775972;

  // Use coordinates from the feature directly
  const [destLon, destLat] = a.geometry.coordinates;

  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLon},${startLat};${destLon},${destLat}?alternatives=false&exclude=toll&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

  try {
    const directionsRes = await fetch(directionsUrl);
    if (!directionsRes.ok) {
      throw new Error(
        `Mapbox API error: ${directionsRes.status} ${directionsRes.statusText}`
      );
    }
    const directionsData = await directionsRes.json();

    if (!directionsData.routes || directionsData.routes.length === 0) {
      throw new Error("No route found from Mapbox.");
    }

    const { distance } = directionsData.routes[0]; // Duration not used in pricing calculation
    const d = distance / 1000;
    const state = a?.properties?.context?.region?.name || "";
    return getPrice(d, subtotal, cartItems, state);
  } catch (e) {
    console.error(e);
  }
}
