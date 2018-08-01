/**
 * @author shangyc 2017/7/29.
 * @int 用户列表
 */

import {Content} from 'layout/';

import {UserManage} from 'views/';

export default {
	path: 'userRole/list',
	name: '角色',
	icon: 'user-circle',
	hidden :false,
	sign :true,
	component: Content,
	redirect: '/userManage/userRole/list',
	children: [
	 {
		path: '/userManage/userRole/list',
		name: '角色管理',
		icon: 'bar-chart',
		component: UserManage.userRole.list
	 }
	]
};