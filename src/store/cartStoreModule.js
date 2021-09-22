// 2. Importando la API simulada
import shop from "@/api/shop";

export default {
  namespaced: true,
  state: {
    // {id, quantity}
    items: [],
    checkoutStatus: null,
  },
  getters: {
    cartProducts(state, getters, rootState) {
      // Regresa el arreglo del detalle de elementos
      // guardados en el carrito
      return state.items.map((cartItem) => {
        const product = rootState.products.items.find(
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
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    addProductToCart({ state, getters, commit, rootGetters }, product) {
      // El producto esta en existencia
      if (rootGetters["products/productIsInStock"](product)) {
        const cartItem = state.items.find((item) => item.id === product.id);
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
        commit("products/decrementProductInventory", product, { root: true });
      }
    },
    checkout({ commit, state }) {
      shop.buyProducts(
        // Proporciono el carrito de compras
        state.items,
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
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity: 1,
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.items = [];
    },
  },
};
