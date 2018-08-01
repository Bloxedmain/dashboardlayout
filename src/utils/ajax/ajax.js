import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

// 导入封装的回调函数
import {
	cbs,
	gbs
} from 'config/';

// 动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = gbs.host;

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {object}   urlParams      url传参
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 */
export default function ({
							 type,
							 path,
							 data,
							 urlParams,
							 fn,
							 errFn,
							 tokenFlag,
							 headers,
							 opts
						 } = {}) {

	var options = {
		method : type,
		url    : path,
		headers: headers && typeof headers === 'object' ? headers : {}
	};

	//检测接口权限
	var api_flag = true;
	if (options.url && options.url.indexOf(gbs.host) && this.$store.state.user.userinfo.access_status === 1) {
		var url         = options.url.replace(gbs.host, '');
		var api_routers = this.$store.state.user.userinfo.api_routers;
		if (!api_routers || !api_routers.constructor === Object || !api_routers[url]) {
			api_flag = false;
		}
	}

	var urlParamsArray = [];
	if (api_flag === true) {
		options[type === 'get' ? 'params' : 'data'] = data;
		
		// 用于url传参
		if(typeof(urlParams)=="object"){
			for(var k in urlParams){
				urlParamsArray.push(k + '=' +urlParams[k])
			}
			options.url += '?' + urlParamsArray.join('&');
		}
		if(typeof(urlParams)=="string" || typeof(urlParams)=="number"){
			options.url +=   urlParams;
		}
		// 分发显示加载样式任务
		this.$store.dispatch('show_loading');

		if (tokenFlag !== true) {
			//如果你们的后台不会接受headers里面的参数，打开这个注释，即实现token通过普通参数方式传
			// data.token = this.$store.state.user.userinfo.token;

			options.headers.token = this.$store.state.user.userinfo.token;
		}

		//axios内置属性均可写在这里
		if (opts && typeof opts === 'object') {
			for (var f in opts) {
				options[f] = opts[f];
			}
		}

		//发送请求
		Vue.axios(options).then((res) => {
			this.$store.dispatch('hide_loading');
			if(res.config.url==="/api/sso/login"||res.data[gbs.api_status_key_field]===gbs.api_status_value_field || res.status === gbs.api_status_value_field ){
				if(gbs.api_data_field){
					if(res.data[gbs.api_data_field]){
						if(res.data[gbs.api_data_field].data){
							fn(res.data[gbs.api_data_field]);
						}else if(!res.data[gbs.api_data_field].data){
							fn(res.data);
						}
					}else{
						fn(res.data);
					}
				}else{
					fn(res.data);
				}
			}else{
				if(gbs.api_custom[res.data[gbs.api_status_key_field]]){
					gbs.api_custom[res.data[gbs.api_status_key_field]].call(this,res.data);
				}else{
					if(errFn){
						errFn.call(this,res.data);
					}else{
						cbs.statusError.call(this, res.data);
					}
				}
			}
		}).catch((err) => {
			if(err.response){
				if(err.response.status == 401){
					if(err.config.url==="/api/pass/sso/login"){
						return this.$message.error("用户名或者密码有误，请重新输入！");
					}else{
						this.$message.error('会话已过期，请重新登录！');
						//this.$router.push('/LoginONlocale');
					}
			    }else if(err.response.status == 404||err.response.status == 500){
			      if(err.response.data.msg){
			      	this.$message.error(err.response.data.msg);
			      }else{
			      	this.$message.error("服务器异常，请联系管理员！");
			      }
			    }
			}else {
		      console.log('Error', err.message);
		    }
			//this.$store.dispatch('hide_loading');
			// cbs.requestError.call(this, err);
		});
	} else {
		this.$alert('您没用权限请求该接口！', '请求错误', {
			confirmButtonText: '确定',
			type             : 'warning'
		});
	}
};
