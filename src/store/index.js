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
    products: [],
    // {id, quantity}
    cart: []
  },
  getters: {
    // Propiedades computadas
    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0);
    }
  },
  actions: {
    // Métodos
    fetchProducts({ commit }) {
      // retornando una promesa
      return new Promise((resolve, reject) => {
        // Realizando la petición de los productos
        shop.getProducts((products) => {
          // Comitiando los datos recolectados
          // store.commit(<mutation>, <payload>)
          commit("setProducts", products);
          resolve();
        });
      });
    },
    addProductToCart(context, product) {
      // El producto esta en existencia
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(
          (item) => item.id === product.id
        );
        // Verificando si el item
        // que se desea agregar no esta
        // en el carrito
        if (!cartItem) {
          // Si no esta se agrega
          context.commit("pushProductToCart", product.id);
        } else {
          // Si ya esta el item tan solo se incrementa
          // la cantidad
          context.commit("incrementItemQuantity", cartItem);
        }
        // Esta mutación se agrega cuando
        // se desea cuidar que no se compren mas productos
        // de los que se tienen disponibles en el inventario
        context.commit("decrementProductInventory", product);
      }
    }
  },
  mutations: {
    // Actualiza el estado
    setProducts(state, /* payload */ products) {
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, product) {
      product.quantity--;
    }
  }
});
