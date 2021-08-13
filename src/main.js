import Vue from "vue";
import App from "./App.vue";
// Importando el store
import store from "@/store/index";

Vue.config.productionTip = false;

new Vue({
  // Inyectando el store dentro de
  // la raíz del componente
  store,
  render: (h) => h(App)
}).$mount("#app");
