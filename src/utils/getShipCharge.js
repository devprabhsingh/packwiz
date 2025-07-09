import categories from "../data/categories";

function getPrice(distance, subtotal, cartItems) {
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

  let shipRate = 0;

  if (subtotal >= 500) {
    shipRate = 0;
  } else if (subtotal >= 300) {
    shipRate = distance > 100 ? 20 : 0;
  } else if (distance > 100) {
    shipRate = 20 + Number((totalWeight * 0.01).toFixed(2));
  } else if (distance > 30) {
    shipRate = 10;
  } else {
    shipRate = 0;
  }

  // 🔁 Add weight surcharge if needed
  if (distance > 100) {
    shipRate += 0.2 * totalWeight; // Add 10% of weight
  }

  shipRate = Number(shipRate.toFixed(2));
  // Calculate delivery time
  let dTime = "1-2 days";
  let cod = true;
  if (distance > 60) {
    dTime = "2-5 days";
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
        price: shipRate + 10,
        deliveryTime: "1-3 days",
        cod: cod,
        shipService: "Express",
      },
    ];
  }
}
export async function getShipCharge(a, subtotal, cartItems) {
  if (!a || !a.geometry || !a.geometry.coordinates || !a.properties) {
    console.error("Invalid address object 'a' provided to getShipCharge.");
    return [];
  }

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

    return getPrice(d, subtotal, cartItems);
  } catch (e) {
    console.error(e);
  }
}
