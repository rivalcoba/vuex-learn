// Importando la API simulada
import shop from "@/api/shop";

export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    setProducts(state, /* payload */ products) {
      state.items = products;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
  },
  getters: {
    availableProducts(state) {
      return state.items.filter((product) => product.inventory > 0);
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    },
  },
  actions: {
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
  }
};
