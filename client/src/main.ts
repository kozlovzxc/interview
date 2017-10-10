// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './styles.scss';

import Vue from 'vue';
import {
  Button,
  Dialog,
} from 'element-ui';

import App from './App.component.vue';
import Header from './components/common/Header/Header.component.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Dialog);

Vue.component('app-header', Header);

export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
