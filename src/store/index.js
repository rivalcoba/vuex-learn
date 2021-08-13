// 1. Importando VUE y VUEX
import Vuex from "vuex";
import Vue from "vue";

// 2. Importando la API simulada
import shop from "@/api/shop";

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
    fetchProducts(context) {
      // Realizando la petición de los productos
      shop.getProducts((products) => {
        // Comitiando los datos recolectados
        // store.commit(<mutation>, <payload>)
        context.commit("setProducts", products);
      });
    }
  },
  mutations: {
    // Actualiza el estado
    setProducts(state, /* payload */ products) {
      state.products = products;
    }
  }
});
