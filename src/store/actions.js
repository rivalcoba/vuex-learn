// 2. Importando la API simulada
import shop from "@/api/shop";

export default {
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
  addProductToCart({ state, getters, commit }, product) {
    // El producto esta en existencia
    if (getters.productIsInStock(product)) {
      const cartItem = state.cart.find((item) => item.id === product.id);
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
};
