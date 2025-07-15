import dynamic from "next/dynamic";

import BackLinks from "../../components/BackLinks";
import SearchBar from "../../components/Searchbar";

const ProductGrid = dynamic(() => import("../../components/ProductGrid"), {
  ssr: true,
  loading: () => <p>Loading Products...</p>,
});

import products from "@/data/products";
import pds from "@/data/pds";

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
        url: product.id.startsWith("pk")
          ? `https://www.packwiz.ca/movingKits/${product.id}`
          : `https://www.packwiz.ca/ItemDetail/${product.id}`,
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
