/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './js/DateFormat.js'

import _ from 'lodash'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import VueCookies from 'vue-cookies'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft, faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Object.defineProperty(Vue.prototype, '$_', { value: _ })

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const swalOptions = {
  heightAuto: false,
}

Vue.use(VueSweetalert2, swalOptions)

Vue.use(VueCookies)

library.add(faAngleRight, faAngleLeft, faBars, faGithub)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')