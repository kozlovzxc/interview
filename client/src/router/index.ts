import Vue from 'vue';
import Router from 'vue-router';
import SurveyPage from '@/components/SurveyPage/SurveyPage.component.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: SurveyPage },
  ],
});
