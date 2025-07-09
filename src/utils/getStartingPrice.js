import products from "@/data/products";
export function getStartingPrice(id) {
  if (id > 11) {
    return 0;
  }
  return products[id][0].priceTable.tier4;
}
