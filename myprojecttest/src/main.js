// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import {
  Tabbar, TabItem , Radio , TabContainer, TabContainerItem , Spinner , DatetimePicker , Toast , Swipe, SwipeItem, Lazyload , Popup , Actionsheet , Navbar , InfiniteScroll ,Button , Progress
} from 'mint-ui';
//
Vue.component(Progress.name, Progress);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Radio.name, Radio);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Spinner.name, Spinner);
Vue.component(Toast.name, Toast);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
Vue.component(Popup.name, Popup);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Navbar.name, Navbar);
Vue.use(InfiniteScroll);

import {wx} from 'weixin-js-sdk'
import $ from 'jquery'
import VueBetterScroll from 'vue2-better-scroll'
Vue.use(VueBetterScroll)

import { Loading } from 'element-ui'
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
import clipper from './assets/clipper'
Vue.use(clipper)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
global.qs = require('qs');
import global_ from './components/Global'
Vue.prototype.COMMEURL = global_


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  beforeCreate(){
    router.beforeEach((to, from, next) => {
      window.document.title = to.meta.title;
      next()
    })
  },
});


