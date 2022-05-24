import Vue from "vue";
import App from "./App.vue";

// 导入后相当于动态设置了不用屏幕下的font-size

import "lib-flexible";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
