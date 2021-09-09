// 1. Importando VUE y VUEX
import Vuex from "vuex";
import Vue from "vue";
// Se importan las "actions"
import actions from './actions'

// 2. Registrando VUEX en VUE
Vue.use(Vuex);

// 3. Creando el Vuex store mediante su
// constructor
export default new Vuex.Store({
  state: {
    // Datos de la app
    products: [],
    // {id, quantity}
    cart: [],
    checkoutStatus: null,
  },
  getters: {
    // Propiedades computadas
    availableProducts(state) {
      return state.products.filter((product) => product.inventory > 0);
    },
    cartProducts(state) {
      // Regresa el arreglo del detalle de elementos
      // guardados en el carrito
      return state.cart.map((cartItem) => {
        const product = state.products.find(
          (product) => product.id === cartItem.id
        );
        // Retornamos y contruimos
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        };
      });
    },
    cartTotal(state, getters) {
      let total = 0;
      getters.cartProducts.forEach((product) => {
        total += product.price * product.quantity;
      });
      return total;
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    },
  },
  actions,
  mutations: {
    // Actualiza el estado
    setProducts(state, /* payload */ products) {
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.cart = [];
    },
  },
});
