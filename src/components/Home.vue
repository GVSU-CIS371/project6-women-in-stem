<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="product in productStore.products"
        :key="product.id"
      >
        <StoreItem :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import StoreItem from "./StoreItem.vue";
import { useProductStore } from "../stores/ProductStore";

const productStore = useProductStore();
productStore.init();
</script>
