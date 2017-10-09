// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUi from 'element-ui';

import App from './App.component.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUi);

export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
