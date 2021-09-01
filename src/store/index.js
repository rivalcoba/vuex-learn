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
  actions: {
    // Métodos
    fetchProducts({ commit }) {
      // retornando una promesa
      return new Promise((resolve) => {
        // Realizando la petición de los productos
        shop.getProducts((products) => {
          // Comitiando los datos recolectados
          // store.commit(<mutation>, <payload>)
          commit("setProducts", products);
          resolve();
        });
      });
    },
    addProductToCart({state, getters, commit}, product) {
      // El producto esta en existencia
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find(
          (item) => item.id === product.id
        );
        // Verificando si el item
        // que se desea agregar no esta
        // en el carrito
        if (!cartItem) {
          // Si no esta se agrega
          commit("pushProductToCart", product.id);
        } else {
          // Si ya esta el item tan solo se incrementa
          // la cantidad
          commit("incrementItemQuantity", cartItem);
        }
        // Esta mutación se agrega cuando
        // se desea cuidar que no se compren mas productos
        // de los que se tienen disponibles en el inventario
        commit("decrementProductInventory", product);
      }
    },
    checkout({ commit, state }) {
      shop.buyProducts(
        // Proporciono el carrito de compras
        state.cart,
        // Callback Succesfully
        () => {
          // Comitearemos dos acciones
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        // Callback Faill
        () => {
          commit("setCheckoutStatus", "fail");
        }
      );
    },
  },
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
