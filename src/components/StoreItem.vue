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
<<<<<<< HEAD
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
=======
      <div class="d-flex justify-space-between align-center">
    <!-- Delete button on the left -->
    <v-btn color="red" @click="deleteProduct">Delete</v-btn>

    <!-- Modify button on the right -->
    <v-btn color="blue" @click="startEditing">Modify</v-btn>
  </div>
    </v-card>

    <v-dialog v-model="isEditing" persistent max-width="600px">
      <v-card>
        <v-card-title>Edit Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="editableProduct.name" label="Name"></v-text-field>
          <v-text-field v-model="editableProduct.description" label="Description"></v-text-field>
          <v-text-field v-model="editableProduct.image" label="Image URL"></v-text-field>
          <v-text-field v-model="editableProduct.price" label="Price" type="number"></v-text-field>
        <v-text-field v-model="editableProduct.rating" label="Rating" type="number"></v-text-field>
        <v-text-field v-model="editableProduct.stock" label="Stock" type="number"></v-text-field>
          <!-- ... other fields ... -->
          <v-select
            v-model="editableProduct.category"
            :items="categories"
            label="Category"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="isEditing = false">Cancel</v-btn>
          <v-btn color="green" @click="updateProduct">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
>>>>>>> 2da7edebc5b22d096f37faa99155da6b59d6a1c3
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive} from "vue";
import { ProductDoc } from "../types/product";
import { useProductStore } from "../stores/ProductStore";
<<<<<<< HEAD
import { defineProps } from 'vue';
import { ref } from 'vue';
=======
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase";
>>>>>>> 2da7edebc5b22d096f37faa99155da6b59d6a1c3

const { product } = defineProps<{
  product: ProductDoc;
}>();

const productStore = useProductStore();
const isEditing = ref(false);


const editableProduct = reactive({ ...product.data });


const categories = ['Groceries', 'Electronics', 'Clothes'];


const startEditing = () => {
  Object.assign(editableProduct, product.data); // Reset any changes
  isEditing.value = true;
};


const updateProduct = async () => {
  if (confirm("Are you sure you want to update this product?")) {
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, { ...editableProduct });
      Object.assign(product.data, editableProduct); // Update local state
      isEditing.value = false;
      console.log("Product updated with ID:", product.id);
      // Trigger reactivity in case you are using it to display
      //productStore.triggerUpdate();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  }
};

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
