import Vue from 'vue';
import 'src/utils/polyfills';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});
