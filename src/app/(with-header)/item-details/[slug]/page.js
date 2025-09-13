import products from "@/data/products";
import categories from "@/data/categories";
import reviewList from "@/data/reviewList";
import { getProductCat } from "@/utils/getProductCat";
import ItemDetailClient from "./ItemDetailClient";

// Utility function to convert a title to a URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// Flatten the products array for easier searching
const flatPs = products.flat();

// --- Generate static paths for pre-rendering ---
// This is an important step for Next.js to know which dynamic pages to build at build time.
export async function generateStaticParams() {
  return flatPs.map((product) => ({
    slug: slugify(product.title),
  }));
}

// --- Generate dynamic metadata for each page ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = flatPs.find((p) => slugify(p.title) === slug);

  if (!item) {
    return {
      title: "Product Not Found | Packwiz",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `Professional grade ${item.title} | Packwiz`,
    description: `As low as $${item.priceTable?.tier4 || item.price || "Lowest price"}, ${item.desc}`,
    keywords: `${item.title}, ${item.title.toLowerCase()}, Packwiz, packaging, ${getProductCat(item.id)}`,
    openGraph: {
      title: `${item.title} | Packwiz`,
      description: item.desc,
      url: `https://packwiz.ca/item-details/${slug}`,
      siteName: "Packwiz",
      images: [
        {
          url: `https://packwiz.ca${item.image}`,
          width: 500,
          height: 300,
          alt: item.title,
        },
      ],
      type: "article",
    },
  };
}

// --- Main Server Component for the Product Detail Page ---
export default async function ItemDetailPage({ params }) {
  const { slug } = await params;
  const item = flatPs.find((p) => slugify(p.title) === slug);

  if (!item) {
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

  // Find and prepare the related data (all done on the server)
  const letter = item.id.slice(0, item.id.length - 1);
  const similarProducts = flatPs.filter(
    (p) => p.id.startsWith(letter) && p.id !== item.id
  );

  // You might need to adjust this logic depending on how getProductCat works
  const category = categories[getProductCat(item.id)] || { unit: "" };
  const reviews = reviewList.filter((r) => r.category === item.title);

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
    mpn: item.id,
    brand: {
      "@type": "Brand",
      name: "Packwiz",
    },
    offers: {
      "@type": "Offer",
      url: `https://packwiz.ca/item-details/${slug}`,
      priceCurrency: "CAD",
      price: item.priceTable.tier1,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
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
        "@type": "MonetaryAmount",
        currency: "CAD",
        value: 0,
      },
      returnShippingFeesAmount: {
        "@type": "MonetaryAmount",
        currency: "CAD",
        value: 0,
      },
    },
    shippingDetails: {
      "@type": "ShippingDeliveryAvailability",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "CA",
      },
      shippingRate: {
        "@type": "MonetaryAmount",
        currency: "CAD",
        value: 30,
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        hasCutsOff: {
          "@type": "DeliveryTimeSettings",
          cutOffTime: "15:00",
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
      {/* Since the ItemDetailClient.js now fetches its own data,
      we no longer need to pass these as props */}
      <ItemDetailClient category={category} reviews={reviews} />
    </>
  );
}
