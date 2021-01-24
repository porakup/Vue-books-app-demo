import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCompositionAPI from '@vue/composition-api';
import AppFilter from './utils/filters/appFilter';

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

Vue.filter('currencyUsd', AppFilter.currencyUsd);
Vue.filter('appDate', AppFilter.appDate);
Vue.filter('shortName', AppFilter.shortName);
Vue.filter('shortTitle', AppFilter.shortTitle);
Vue.filter('shortLName', AppFilter.shortLName);
Vue.filter('shortLTitle', AppFilter.shortLTitle);
Vue.filter('shortDesc', AppFilter.shortDesc)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
