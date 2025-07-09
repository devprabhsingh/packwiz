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
