import Vue from "vue";
import App from "./App.vue";
// Importando el store
import store from "@/store/index";
// importing filter
import { currency } from "@/helpers/currency";

Vue.config.productionTip = false;
// Registering filter globally
Vue.filter("currency", currency);

new Vue({
  // Inyectando el store dentro de
  // la raíz del componente
  store,
  render: (h) => h(App),
}).$mount("#app");
