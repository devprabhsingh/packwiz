import products from "@/data/products";
import categories from "@/data/categories";
import ProductInfoClient from "./ProductInfoClient";

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  const productCat = categories[id];
  const productData = products[id] ? products[id][0] : null;

  if (!productCat) {
    return {
      title: "Product Not Found - Packwiz",
      description: "The product you are looking for does not exist on Packwiz.",
    };
  }

  const pageTitle = `${productCat.title} - Packwiz`;
  const pageDescription = productData?.description || productCat.info;
  const pageKeywords = `${productCat.title}, ${productData?.name || ""}, ${productCat.subtitle}, ${productCat.info}, product, shop, buy, online, Packwiz`;
  const productImage = productData?.image; // Provide a fallback image URL
  const pageUrl = `https://packwiz.ca/products/${id}`;

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
      creator: "@PackwizOfficial", // Replace with your actual Twitter handle
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

// This is now an async Server Component function
export default async function ProductPage({ params }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  const productCat = categories[id];
  const productData = products[id]; // Pass the whole array/object if ProductList needs it

  if (!productCat) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <ProductInfoClient productData={productData} productCat={productCat} />
  );
}
