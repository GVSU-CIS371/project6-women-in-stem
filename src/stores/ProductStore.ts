import { defineStore } from 'pinia';
import { ProductDoc } from '../types/product';
import { initProducts } from '../data-init';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';


export const useProductStore = defineStore('ProductStore', {
  state: () => ({
    products: [] as ProductDoc[],
    allProducts: [] as ProductDoc[],
  }),
  actions: {
    async init() { 
      this.products = initProducts;
      this.allProducts = initProducts;

      const db = getFirestore();
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);

      if (productsSnapshot.empty) {
        
        await Promise.all(initProducts.map(product => addDoc(productsCollection, product)));
        this.products = initProducts; // Update Pinia state
      } else {
       
        this.products = productsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            data: { 
              name: data.name,
              description: data.description,
              price: data.price,
              rating: data.rating,
              stock: data.stock,
              image: data.image,
              category: data.category,
            },
          };
        });
      }
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
