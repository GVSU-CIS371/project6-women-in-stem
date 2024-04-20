<template>
  <div>
    <v-card>
      <v-card-title>{{ product.data.name }}</v-card-title>
      <v-row align="center" class="pa-4">
        <v-col cols="1"></v-col>
        <v-rating
          :model-value="product.data.rating"
          color="orange-lighten-3"
          readonly
          size="16"
          class="ml-2 mr-2"
        ></v-rating>
        <v-col cols="1"></v-col>
        <v-icon
          icon="mdi-cash"
          color="green-lighten-3"
          class="mr-2"
        ></v-icon>
        <span class="mr-2">{{ product.data.price }}</span>
        <v-col cols="1"></v-col>
        <v-icon
          icon="mdi-package-variant-closed"
          color="light-blue-lighten-3"
          class="mr-2"
        ></v-icon>
        <span>{{ product.data.stock }}</span>
      </v-row>
      <v-col cols="1"></v-col>
      
      <v-img
        :src="product.data.image"
        width="200"
        height="300"
        class="mx-auto"
      ></v-img>
      <v-card-text>{{ product.data.description }}</v-card-text>
      <v-btn color="red" @click="deleteProduct">Delete</v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ProductDoc } from '../types/product';
import { useProductStore } from '../stores/ProductStore';

const { product } = defineProps<{
  product: ProductDoc
}>();

const productStore = useProductStore();

// Method to delete the current product
const deleteProduct = async () =>{
  console.log('Deleting product:', product.id);
  await productStore.deleteProduct(product.id);
};
</script>
