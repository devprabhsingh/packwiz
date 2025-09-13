import products from "@/data/products";
import categories from "@/data/categories";
import ProductInfoClient from "./ProductInfoClient";

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

// Flatten the products array for easier searching
const flatProducts = products.flat();

// Generate static paths for pre-rendering
export async function generateStaticParams() {
  const categorySlugs = Object.keys(categories).map((key) => ({
    slug: slugify(categories[key].title),
  }));
  return categorySlugs;
}

// Generate dynamic metadata for each page
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Find the category based on the slug
  const productCatKey = Object.keys(categories).find(
    (key) => slugify(categories[key].title) === slug
  );

  const productCat = categories[productCatKey];

  if (!productCat) {
    return {
      title: "Product Category Not Found - Packwiz",
      description: "The product category you are looking for does not exist.",
    };
  }

  // Find one product from the category to get image/description for meta tags
  const productData = products[productCatKey]
    ? products[productCatKey][0]
    : null;

  const pageTitle = `${productCat.title} - Packwiz`;
  const pageDescription = productData?.description || productCat.info;
  const pageKeywords = `${productCat.title}, ${productData?.name || ""}, ${productCat.subtitle}, ${productCat.info}, product, shop, buy, online, Packwiz`;
  const productImage = productData?.image;
  const pageUrl = `https://packwiz.ca/product-info/${slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [
        {
          url: productImage,
          width: 800,
          height: 600,
          alt: `${productCat.title} image`,
        },
      ],
      type: "website",
      siteName: "Packwiz",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [productImage],
      creator: "@PackwizOfficial",
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

// Main server component for the product category page
export default async function ProductPage({ params }) {
  const { slug } = await params;

  // Find the category key based on the slug
  const productCatKey = Object.keys(categories).find(
    (key) => slugify(categories[key].title) === slug
  );

  const productCat = categories[productCatKey];
  const productData = products[productCatKey];

  if (!productCat) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Product Category Not Found</h2>
        <p>The product category you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <ProductInfoClient productData={productData} productCat={productCat} />
  );
}
