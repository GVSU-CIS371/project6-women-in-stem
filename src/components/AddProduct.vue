<template>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="newProduct.name" label="Product Name"></v-text-field>
        <v-text-field v-model="newProduct.imageUrl" label="Image URL"></v-text-field>
        <v-textarea v-model="newProduct.description" label="Description"></v-textarea>
        <v-slider v-model="newProduct.rating" :max="5" label="Rating"></v-slider>
        <v-text-field type="number" v-model="newProduct.price" label="Price"></v-text-field>
        <v-text-field type="number" v-model="newProduct.stock" label="Stock"></v-text-field>
        <v-btn color="success" type="submit">Add Product</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useProductStore } from '@/stores/ProductStore';
  
  export default {
    setup() {
      const newProduct = ref({
        name: '',
        imageUrl: '',
        description: '',
        rating: 0,
        price: 0,
        stock: 0
      });
  
      const productStore = useProductStore();
  
      const submitForm = async () => {
        if (confirm("Are you sure you want to add this product?")) {
          await productStore.createProduct({ data: newProduct.value });
          // Reset form or give feedback
        }
      };
  
      return {
        newProduct,
        submitForm
      };
    }
  };
  </script>
  