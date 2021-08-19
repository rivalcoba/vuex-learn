<template>
  <div class="">
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="spinner" />
    <ul v-else>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }} - {{ product.price }}
        <button @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
  },
  methods: {
    addProductToCart(product) {
      // Despachando la acción
      this.$store.dispatch("addProductToCart", product);
    },
  },
  async created() {
    // Cambiando a cargando
    this.loading = true;
    // El segundo parámetro seria un payload si
    // lo hay
    try {
      await this.$store.dispatch("fetchProducts");
      this.loading = false;
    } catch (error) {
      alert("Error en la carga");
    }
  },
};
</script>

<style scoped>
ul li {
  padding: 10px;
}
</style>