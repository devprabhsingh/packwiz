// components/ServiceLocations.js
export default function ServiceLocations() {
  const cities = [
    "Toronto",
    "Vancouver",
    "Montreal",
    "Calgary",
    "Ottawa",
    "Edmonton",
    "Winnipeg",
    "Quebec City",
    "Hamilton",
    "Kitchener",
  ];

  return (
    <section
      style={{
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>We Serve All Over Canada</h2>
      <p>Major cities we serve include:</p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "1rem 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {cities.map((city) => (
          <li key={city} style={{ fontWeight: "600", color: "#ff6f20" }}>
            {city}
          </li>
        ))}
      </ul>
      <p>And many more across the country!</p>
    </section>
  );
}
