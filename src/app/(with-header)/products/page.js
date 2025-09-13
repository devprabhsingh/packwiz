import dynamic from "next/dynamic";
import BackLinks from "../../components/BackLinks";
import SearchBar from "../../components/Searchbar";

const ProductGrid = dynamic(() => import("../../components/ProductGrid"), {
  ssr: true,
  loading: () => <p>Loading Products...</p>,
});

import products from "@/data/products";
import pds from "@/data/pds";

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

export async function generateMetadata() {
  const allProducts = products.flat();

  const productStructuredData = {
    "@context": "https://schema.org",
    "@graph": allProducts.map((product) => ({
      "@type": "Product",
      name: product.title,
      image: [`https://www.packwiz.ca${product.image}`],
      description: product.desc,
      sku: product.id,
      brand: {
        "@type": "Brand",
        name: "Packwiz",
      },
      offers: {
        "@type": "Offer",
        // The key change is here: use the slugified title for the URL
        url: product.id.startsWith("pk")
          ? `https://www.packwiz.ca/moving-kits/${slugify(product.title)}`
          : `https://www.packwiz.ca/item-details/${slugify(product.title)}`,
        priceCurrency: "CAD",
        price: product.id.startsWith("pk")
          ? product.price
          : product.priceTable.tier4,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    })),
  };

  return {
    title: "All Products | Packwiz",
    description:
      "Packwiz provides Canada's best value in packing supplies. Explore our wide range of corrugated moving boxes, premium bubble wrap, strong packing tapes, stretch film, and essential accessories designed for secure shipping and easy moves. Enjoy competitive pricing and fast, nationwide delivery for all your packing needs",
    alternates: {
      canonical: "/products",
    },
    structuredData: productStructuredData,
  };
}

export default function ProductsPage() {
  return (
    <>
      <div className="mobile-search">
        <SearchBar />
      </div>
      <BackLinks title="" id="" />
      <ProductGrid pds={pds} />
    </>
  );
}
