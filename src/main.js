import Vue from 'vue'
import App from './App.vue'
import './plugins/vant'
import VueVideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
require('./video.css')
import router from './router/index.js'
import store from './store/index.js'
import HeaderNav from '@/components/headerNav.vue'
import BaseLayout from '@/components/baseLayout'
import CommonLayout from '@/components/commonLayout'
import UserLayout from '@/components/userLayout'
import VueTouch from 'vue-touch'

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueVideoPlayer)
Vue.config.productionTip = false;


// designWidth:设计稿的实际宽度值，需要根据实际设置
// maxWidth:制作稿的最大宽度值，需要根据实际设置
// 这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
(function(designWidth, maxWidth) {
  var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement('style'),
    tid;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 540;
    width > maxWidth && (width = maxWidth);
    var rem = (width * 100) / designWidth;
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement('div');
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  // 要等 viewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem();

  win.addEventListener(
    'resize',
    function() {
      clearTimeout(tid); // 防止执行两次
      tid = setTimeout(refreshRem, 300);
    },
    false
  );

  win.addEventListener(
    'pageshow',
    function(e) {
      if (e.persisted) {
        // 浏览器后退的时候重新计算
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    },
    false
  );

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px';
  } else {
    doc.addEventListener(
      'DOMContentLoaded',
      function() {
        doc.body.style.fontSize = '16px';
        doc.body.height = document.documentElement.clientWidth
      },
      false
    );
  }
})(375, 750);


Vue.component('header-nav',HeaderNav)
Vue.component('base-layout',BaseLayout)
Vue.component('common-layout',CommonLayout)
Vue.component('user-layout',UserLayout)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
