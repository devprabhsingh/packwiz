import pds from "@/data/pds";

export default async function sitemap() {
  const baseUrl = "https://www.packwiz.ca";

  const productUrls = pds.map((product) => ({
    url: `${baseUrl}/ItemDetail/${product.id}`,
    lastModified: new Date(),
    priority: 0.7, // Products are important
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"), // Keep your existing lastmod if accurate for last content update
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"),
      priority: 0.8,
    },
    ...productUrls,
  ];
}
