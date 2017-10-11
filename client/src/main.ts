// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './styles.scss';

import 'script-loader!../node_modules/webrtc-adapter/out/adapter.js';
import 'script-loader!../node_modules/videojs-record/dist/videojs.record.js';

import Vue from 'vue';
import ElementUi from 'element-ui';

import App from './App.component.vue';
import Header from './components/common/Header/Header.component.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUi);

Vue.component('app-header', Header);

export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
