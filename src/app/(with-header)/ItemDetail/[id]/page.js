import products from "@/data/products";
import categories from "@/data/categories";
import reviewList from "@/data/reviewList";
import { getProductCat } from "@/utils/getProductCat";
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
    image: `https://packwiz.ca${item.image}`,
    description: item.desc,
    sku: item.id,
    mpn: item.id, // Only include if item.id truly functions as an MPN
    brand: {
      "@type": "Brand",
      name: "Packwiz",
    },
    offers: {
      "@type": "Offer",
      url: `https://packwiz.ca/ItemDetail/${item.id}`,
      priceCurrency: "CAD",
      price: item.priceTable.tier1,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock", // Ensure this is dynamic based on actual stock
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      appliesToProduct: {
        "@type": "Product",
        hasProductReturnPolicy:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
      },
      merchantReturnDays: 30,
      returnPolicyCategory: "https://schema.org/MerchantReturnByMail",
      restockingFee: {
        // Recommended: Explicitly state if there's a restocking fee
        "@type": "MonetaryAmount",
        currency: "CAD",
        value: 0, // Set to your actual restocking fee, or 0 if none
      },
      returnShippingFeesAmount: {
        "@type": "MonetaryAmount",
        currency: "CAD",
        value: 0, // Set to your actual return shipping cost, or 0 if free
      },
    },
    shippingDetails: {
      "@type": "ShippingDeliveryAvailability",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "CA",
      },
      // REQUIRED: Shipping Rate
      shippingRate: {
        "@type": "MonetaryAmount",
        currency: "CAD", // Match your offers.priceCurrency
        value: 30,
      },

      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        hasCutsOff: {
          "@type": "DeliveryTimeSettings",
          cutOffTime: "15:00", // Example: 3 PM EST
          cutOffTimeTimezone: "America/Toronto",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 3,
          maxValue: 5,
          unitCode: "DAY",
        },
      },
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
