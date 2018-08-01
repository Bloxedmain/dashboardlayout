import Vue from 'vue';
import $ from 'jquery'
// element-ui
import ElementUI from 'element-ui';
import vueGridLayout from 'vue-grid-layout';
import 'element-ui/lib/theme-default/index.css';
import vueKanban from 'vue-kanban'
import VueAwesomeSwiper from 'vue-awesome-swiper';


Vue.use(VueAwesomeSwiper) 
Vue.use(vueKanban)
Vue.use(ElementUI);
Vue.use(vueGridLayout);

Vue.config.productionTip = true;
Vue.config.devtools      = true;


import router from 'router/';
import 'register/';
import store from 'store/';

import App from './App';

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})

/**
 * @title 供嵌入的iframe调用父页面的方法
 * @param {Array<JSON>} methods - 要执行的方法组
 */
window.executeMethod = function(methods){
	let method = {};
	for(let i = 0; i <= methods.length - 1; i++){
		method = methods[i];
		switch(method.invokeName){
			case '$message.success':
				window.globalVueMessage && window.globalVueMessage.success(method.message || '');
				break;
			case '$message.error':
				window.globalVueMessage && window.globalVueMessage.error(method.message || '');
				break;
			case 'login_actions.disabled':
				window.globalVueLoginActions && (window.globalVueLoginActions.disabled = method.disableLoading);
				break; 
		}		
	}
}