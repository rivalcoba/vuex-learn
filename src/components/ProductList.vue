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
// 2. Importando la API simulada
import shop from "@/api/shop";
// Importando el store
import store from "@/store/index";

export default {
  computed: {
    products() {
      return store.state.products;
    },
  },
  created() {
    // Realizando la petición de los productos
    shop.getProducts((products) => {
      // Comitiando los datos recolectados
      // store.commit(<mutation>, <payload>)
      store.commit("setProducts", products);
    });
  },
};
</script>

<style>
</style>