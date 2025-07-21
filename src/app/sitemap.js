import pds from "@/data/pds";

export default async function sitemap() {
  const baseUrl = "https://www.packwiz.ca";

  const productUrls = pds.map((product) => {
    let urlPath;
    if ([0, 3, 7, 8, 10, 11, 12, 13].includes(product.id)) {
      urlPath = `/productinfo/${product.id}`;
    } else if (product.id > 13) {
      urlPath = `/ItemDetail/${product.idKey}`;
    } else {
      urlPath = `/ItemDetail/${product.idKey}01`;
    }
    return {
      url: `${baseUrl}${urlPath}`,
      lastModified: new Date(),
      priority: 0.7, // Products are important
    };
  });

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
