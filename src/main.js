import Vue from 'vue'
import App from './App.vue'

import Mindmap from 'vue-mindmap'
import 'vue-mindmap/dist/vue-mindmap.css'
Vue.use(Mindmap)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
