/**
 * @author shangyc 2017/7/29.
 * @int 用户列表
 */

import {Content} from 'layout/';

import {UserManage} from 'views/';

export default {
	path: 'userList/list',
	name: '用户',
	icon: 'user-plus',
	sign :true,
	component: Content,
	redirect: '/userManage/userList/list',
	children: [
	 {
		path: '/userManage/userList/list',
		name: '用户列表',
		icon: 'bar-chart',
		component: UserManage.userList.list
	 }
	]
};