import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.prototype.$userType = null;

new Vue({
  router,
  vuetify,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')
