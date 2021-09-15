// 1. Importando VUE y VUEX
import Vuex from "vuex";
import Vue from "vue";
import cart from "./cartStoreModule";
import products from "./productStoreModule";

// 2. Registrando VUEX en VUE
Vue.use(Vuex);

// 3. Creando el Vuex store mediante su
// constructor
export default new Vuex.Store({
  modules: {
    cart,
    products,
  },
  state: {
    // Datos de la app
  },
  getters: {
    // Propiedades computadas
  },
  actions: {
    // Metodos que detonan mutaciones
  },
  mutations: {
    // Actualizan el estado
  },
});
