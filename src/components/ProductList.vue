<template>
  <div class="">
    <h1>Product List</h1>
    <ul>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
// Importando el store
import store from "@/store/index";

export default {
  computed: {
    products() {
      return store.getters.availableProducts;
    },
  },
  created() {
    // El segundo parámetro seria un pay load si
    // lo hay
    store.dispatch("fetchProducts");
  },
};
</script>

<style>
</style>