import { defineStore } from 'pinia';
import { ProductDoc } from '../types/product';
import { initProducts } from '../data-init';

export const useProductStore = defineStore('ProductStore', {
  state: () => ({
    products: [] as ProductDoc[],
    allProducts: [] as ProductDoc[],
  }),
  actions: {
    init() {
      this.products = initProducts;
      this.allProducts = initProducts; 
    },

    filterByCategory(category: string) {
      if (!category) {
        this.products = this.allProducts;
      } else {
        this.products = this.allProducts.filter(product => product.data.category === category);
      }
    },

    filterByRating(minRating: number) {
      this.products = this.allProducts.filter(product => product.data.rating >= minRating);
    },
  },
});
