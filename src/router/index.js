/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// import {Home, Content} from 'layout/'; 有啥用呢？
import {Login} from 'views/'
import {LoginONlocale} from 'views/'
import {UserInfo} from 'views/'
import {dash}from 'views/'
import {SwitchUnit}from 'views/'

import unitManage from './unitManage'
import userManage from './userManage'
import groupManage from './groupManage'
import systemParam from './systemParam'
import infoApproval from './infoApproval'
import dataContrl from './dataContrl'
import manageBoard from './manageBoard'
import oneUnitManage from './oneUnitManage'


export default new Router({
	routes: [
        oneUnitManage,
		{
			path  : '/',
			name  : 'Hello',
			hidden: true,
			redirect(to){
				//return 'login';
				return '/dash/dashBoard'
			}
		}, 
		{
			path     : '/login',
			name     : '跳转登录',
			hidden   : true,
			component: Login
		},
		{
			path     : '/LoginONlocale',
			name     : '本地登录',
			hidden   : true,
			component: LoginONlocale
		},
		{
			path     : '/dash/dashBoard',
			name     : '看板',
			hidden   : true,
			component: dash.dashBoard,
		},
		{
			path	 : '/switchUnit/:unitId',
			name	 : '切换登陆信息',
			hidden	 : true,
			component: SwitchUnit
		},
		{
			path     : '/userinfo',
			name     : '个人信息',
			hidden   : true,
			component: UserInfo
		},
		/*{
			path     : '/oneunit',
			name     : '单个机构管理页面',
			hidden   : true,
			component: OneUnitHome,
			redirect: '/oneunit/table',
			children:oneunit_menu_routes
		},*/
	    manageBoard,
		unitManage,
		userManage,
		groupManage,
		systemParam,
		infoApproval,
		dataContrl
	]
})