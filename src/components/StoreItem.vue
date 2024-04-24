<template>
  <div>
    <v-card>
      <v-card-title>{{ isEditMode ? editedProduct.name : product.data.name }}</v-card-title>
      <v-row align="center" class="pa-4">
        <v-col cols="1"></v-col>
        <v-rating
        :model-value="isEditMode ? editedProduct.rating : product.data.rating"
          color="orange-lighten-3"
          readonly="!isEditMode"
          size="16"
          class="ml-2 mr-2"
        ></v-rating>
        <v-col cols="1"></v-col>
        <v-icon icon="mdi-cash" color="green-lighten-3" class="mr-2"></v-icon>
        <span class="mr-2">{{ isEditMode ? editedProduct.price : product.data.price }}</span>
        <v-col cols="1"></v-col>
        <v-icon
          icon="mdi-package-variant-closed"
          color="light-blue-lighten-3"
          class="mr-2"
        ></v-icon>
        <span>{{ isEditMode ? editedProduct.stock : product.data.stock }}</span>
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
      <v-btn v-if="isEditMode" color="primary" @click="updateProduct">Update</v-btn>
    </v-card>
    <v-btn color="primary" @click="confirmCreate">Create</v-btn>
    
    <!-- Editable fields -->
    <div v-if="isEditMode">
      <v-text-field v-model="editedProduct.name" label="Name"></v-text-field>
      <v-text-field v-model="editedProduct.rating" label="Rating"></v-text-field>
      <v-text-field v-model="editedProduct.price" label="Price"></v-text-field>
      <v-text-field v-model="editedProduct.stock" label="Stock"></v-text-field>
      <v-text-field v-model="editedProduct.image" label="Image URL"></v-text-field>
      <v-text-field v-model="editedProduct.description" label="Description"></v-text-field>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProductDoc } from "../types/product";
import { useProductStore } from "../stores/ProductStore";
import { defineProps } from 'vue';
import { ref } from 'vue';

const { product } = defineProps<{
  product: ProductDoc;
}>();

const productStore = useProductStore();

// Method to delete the current product
const deleteProduct = async () => {
  // console.log('Deleting product:', product.id);
  // await productStore.deleteProduct(product.id);

  if (confirm("Do you want to delete this item?" + product.id)) {
    productStore.deleteProduct(product.id);
  }
};
// Method to toggle edit mode
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
};

// Method to cancel edit mode
const cancelEdit = () => {
  editedProduct.value = { ...product };
  isEditMode.value = false;
};

// Method to update product
const updateProduct = async () => {
  const confirmUpdate = window.confirm('Are you sure you want to update this product?');
  if (confirmUpdate) {
    console.log('Updating product:', editedProduct.value);
    await productStore.updateProduct(editedProduct.value);
    isEditMode.value = false;
  }
};

// Method to create a new product
const confirmCreate = async () => {
  const confirmAdd = window.confirm('Are you sure you want to add this item?');
  if (confirmAdd) {
    try {
      // Create a new item object with the necessary properties
      const newItem = {
        name: 'New Product',
        
        description: 'Description',
        
        price: "Price",

        rating: "Rating",

        stock: "Stock",

        image: "URL",

        category: "Category",
      };
      await productStore.addItemToFirestore(newItem);
      console.log('Item created successfully.');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  } else {
    console.log('Add item operation cancelled.');
  }
};
</script>
