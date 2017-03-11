import Vue from 'vue';
import App from './components/App.vue';
import store from './store/';
import { Vue2Dragula } from 'vue2-dragula'

Vue.use(Vue2Dragula, {
  logging: {
    // service: true,
    // dragHandler: true
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  created(){
    const $service = this.$dragula.$service;
    $service.options('operations', {
      moves: function (el, source, handle, sibling) {
        return el.tagName !== 'BUTTON'
      },
      accepts: function (el, target, source, sibling) {
        return !!sibling;
      },
      invalid: function (el, handle) {
        return !handle.classList.contains('handle');
      },
      direction: 'horizontal'
    });
  }
});
