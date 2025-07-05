import { products } from "@/data/numberSheet";

export async function getStaticProps() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": products.flat().map((product) => ({
      "@type": "Product",
      name: product.title,
      image: [`https://packwiz.ca${product.image}`],
      description: product.desc,
      sku: product.id,
      brand: {
        "@type": "Brand",
        name: "Packwiz",
      },
      offers: {
        "@type": "Offer",
        url: product?.id?.startsWith("pk")
          ? `https://packwiz.ca/movingKits/${product.id}`
          : `https://packwiz.ca/ItemDetail/${product.id}`,
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
    props: {
      structuredData,
    },
  };
}
