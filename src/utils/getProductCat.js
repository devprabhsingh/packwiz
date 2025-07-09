export function getProductCat(productId) {
  if (!productId) return null;

  if (productId.startsWith("bx")) {
    return 0;
  } else if (productId.startsWith("mb")) {
    return 1;
  } else if (productId.startsWith("sw")) {
    return 2;
  } else if (productId.startsWith("gl")) {
    return 3;
  } else if (productId.startsWith("ct")) {
    return 4;
  } else if (productId.startsWith("gt")) {
    return 5;
  } else if (productId.startsWith("rt")) {
    return 6;
  } else if (productId.startsWith("gb")) {
    return 7;
  } else if (productId.startsWith("cv")) {
    return 8;
  } else if (productId.startsWith("fp")) {
    return 9;
  } else if (productId.startsWith("np")) {
    return 10;
  } else if (productId.startsWith("bw")) {
    return 11;
  } else if (productId.startsWith("pk")) {
    return 12;
  } else {
    return null; // or -1 if you want to handle unknown cases
  }
}
