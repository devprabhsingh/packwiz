import products from "@/data/products";
import categories from "@/data/categories";

// Utility function to convert a title to a URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/-+$/, "");
};

export default async function sitemap() {
  const baseUrl = "https://www.packwiz.ca";

  // Flatten the products array for easier searching
  const flatProducts = products.flat();

  // Generate URLs for each individual product
  const productUrls = flatProducts.map((product) => {
    let urlPath;
    const productSlug = slugify(product.title);

    // Differentiate between moving kits and other products based on ID
    if (product.id.startsWith("pk")) {
      urlPath = `/moving-kits/${productSlug}`;
    } else {
      urlPath = `/item-details/${productSlug}`;
    }

    return {
      url: `${baseUrl}${urlPath}`,
      lastModified: new Date(),
      priority: 0.7,
    };
  });

  // Generate URLs for each product category page
  const categoryUrls = Object.keys(categories).map((key) => {
    const categoryTitle = categories[key].title;
    const categorySlug = slugify(categoryTitle);
    return {
      url: `${baseUrl}/product-info/${categorySlug}`,
      lastModified: new Date(),
      priority: 0.8, // Categories are more important than individual products
    };
  });

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"),
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
      url: `${baseUrl}/moving-packing-blogs`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/moving-packing-blogs/moving-checklist`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2025-07-14T03:20:19+00:00"),
      priority: 0.8,
    },
    ...productUrls,
    ...categoryUrls,
  ];
}
