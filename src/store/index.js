// 1. Importando VUE y VUEX
import Vuex from "vuex";
import Vue from "vue";

// 2. Registrando VUEX en VUE
Vue.use(Vuex);

// 3. Creando el Vuex store mediante su
// constructor
export default new Vuex.Store({
  state: {
    // Datos de la app
    products: []
  },
  getters: {
    // Propiedades computadas
    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0);
    }
  },
  actions: {
    // Métodos
    fetchProducts() {
      // TODO: Implementar
    }
  },
  mutations: {
    // Actualiza el estado
    setProducts(state, /* payload */ products) {
      state.products = products;
    }
  }
});
