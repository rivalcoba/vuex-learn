<template>
  <div class="">
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="spinner" />
    <ul v-else>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }} - {{ product.price | currency }} -
        {{ product.inventory }}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      productIndex: 1,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    ...mapGetters({
      productIsInStock: "productIsInStock",
    }),
  },
  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
      addProductToCart: 'addProductToCart'
    }),
  },
  async created() {
    // Cambiando a cargando
    this.loading = true;
    // El segundo parámetro seria un payload si
    // lo hay
    try {
      await this.fetchProducts();
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