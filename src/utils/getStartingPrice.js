import products from "@/data/products";
export function getStartingPrice(id) {
  if (id > 13) {
    return 0;
  }
  return products[id][0].priceTable.tier4;
}
