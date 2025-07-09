export async function getTaxRate(province) {
  switch (province) {
    case "Alberta":
    case "Yukon":
    case "Nunavut":
    case "Northwest Territories":
      return 0.05;
    case "British Columbia":
    case "Manitoba":
      return 0.12;
    case "Saskatchewan":
      return 0.11;
    case "Quebec":
      return 0.14975;
    case "Ontario":
      return 0.13;
    case "New Brunswick":
    case "Newfoundland & Labrador":
    case "Prince Edward Island":
      return 0.15;
    case "Nova Scotia":
      return 0.14;

    default:
      return 0;
  }
}
