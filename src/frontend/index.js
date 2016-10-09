import Vue from 'vue';
import 'src/utils/polyfills';
import App from './components/App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});
