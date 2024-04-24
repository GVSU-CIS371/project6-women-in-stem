import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import db from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
  }),
  actions: {
    async init() {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);

      if (productsSnapshot.empty) {
        await Promise.all(
          initProducts.map((product) => {
            const productRef = doc(db, `products/${product.id}`);
            setDoc(productRef, product.data);
          })
        );
        this.products = initProducts; // Update Pinia state
      } else {
        this.products = productsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        }) as ProductDoc[];
      }
    },

    deleteProduct(productId: string) {
      console.log("Made it to the store");
      try {
        const productRef = doc(db, "products", productId);
        deleteDoc(productRef);
        // console.log("Deleted product with ID:", productId);
        // Update the products array in Pinia state after deletion
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
        // this.allProducts = this.allProducts.filter(
        //   (product) => product.id !== productId
        // );
        // console.log("Updated pinia stuff");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },

    filterByCategory(category: string) {
      if (!category) {
        return this.products;
      } else {
        return this.products.filter(
          (product) => product.data.category === category
        );
      }
    },

    filterByRating(minRating: number) {
      return this.products.filter(
        (product) => product.data.rating >= minRating
      );
    },
  },
});
