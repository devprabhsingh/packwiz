import { products, categories, reviewList } from "@/data/numberSheet";
import { getProductCat } from "@/utils";
import ItemDetailClient from "./ItemDetailClient";
const flatPs = products.flat();

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = flatPs.find((p) => p.id === id);

  if (!item) {
    return {
      title: "Product Not Found | Packwiz",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${item.title} | Packwiz`,
    description: item.desc, // Use a concise description for the meta tag
    keywords: `${item.title}, ${item.title.toLowerCase()}, Packwiz, packaging, ${getProductCat(
      item.id
    )}`, // Example keywords
    openGraph: {
      title: `${item.title} | Packwiz`,
      description: item.desc,
      url: `https://packwiz.ca/ItemDetail/${item.id}`,
      siteName: "Packwiz",
      images: [
        {
          url: `https://packwiz.ca${item.image}`, // Absolute URL for Open Graph image
          width: 800, // Example width
          height: 600, // Example height
          alt: item.title,
        },
      ],
      type: "article", // More specific type for products
    },
    // Add canonical URL if needed, e.g., if there are multiple ways to reach this page
    // canonical: `https://packwiz.ca/ItemDetail/${item.id}`,
  };
}

// --- Main Server Component for the Product Detail Page ---
export default async function ItemDetailPage({ params }) {
  const { id } = await params;
  const item = flatPs.find((p) => p.id === id);

  // Handle case where item is not found
  if (!item) {
    // You might want to render a more sophisticated 404 page here
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for could not be found.</p>
        <p>
          <a href="/products" style={{ color: "#ff6f20" }}>
            Explore other products
          </a>
        </p>
      </div>
    );
  }

  // Prepare data that the client component needs, all done on the server
  const letter = id.slice(0, id.length - 1);
  const similarProducts = flatPs.filter(
    (p) => p.id.startsWith(letter) && p.id !== id
  );

  const category = categories[getProductCat(item.id)] || { unit: "" };
  const reviews = reviewList.filter((r) => r.category === item.title);

  // Price tiers for display (static part, can be pre-calculated)
  const priceTiers = [
    { label: "Upto 4", value: item.priceTable.tier1 },
    { label: "5 - 9", value: item.priceTable.tier2 },
    { label: "10 - 24", value: item.priceTable.tier3 },
    { label: "25+", value: item.priceTable.tier4 },
  ];

  // --- JSON-LD Structured Data for Rich Results (Server-side) ---
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    image: `https://packwiz.ca${item.image}`, // Absolute URL is crucial for schema
    description: item.desc, // Use 'desc' for general product description
    sku: item.id, // Unique identifier for the product
    mpn: item.id, // Manufacturer Part Number (if applicable, can be item.id)
    brand: {
      "@type": "Brand",
      name: "Packwiz",
    },
    offers: {
      "@type": "Offer",
      url: `https://packwiz.ca/ItemDetail/${item.id}`, // Canonical URL
      priceCurrency: "CAD", // Assuming Canadian Dollars based on location
      price: item.priceTable.tier1, // Use the lowest tier price as the base price for schema
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Render the Client Component, passing down all necessary props */}
      <ItemDetailClient
        item={item}
        similarProducts={similarProducts}
        category={category}
        reviews={reviews}
        priceTiers={priceTiers}
      />
    </>
  );
}
