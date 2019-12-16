import Vue from 'vue';
import Element from 'main/index.js';
import App from './play/index.vue';
import 'packages/theme-chalk/src/index.scss';

Vue.use(Element, {size: 'medium'});

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
