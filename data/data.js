import products from './products';
import sales from './sales.json';
import countries from './countries.json';
import districts from './districts.json';
import models from './models.json';

export function getProducts() {
  return products;
}

export function getProductNames() {
  return products.map(x => x.name);
}

export const getSalesByProductId = id => {
  return sales.productSales.filter(x => x.productId === id);
};

export function getCountries() {
  return countries;
}

export function getDistricts() {
  return districts;
}

export function getNumericModelById(id) {
  return models.filter(x => x.productId === parseInt(id));
}
