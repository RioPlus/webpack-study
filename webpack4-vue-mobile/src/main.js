import Vue from "vue";
import App from "./App.vue";
// 国际化
import i18n from "./assets/lang";

// 导入后相当于动态设置了不用屏幕下的font-size
import "lib-flexible";

// 开启mock
import "./mock/index.js"

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount("#app");
