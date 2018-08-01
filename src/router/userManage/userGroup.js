/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

import {UserManage} from 'views/';

export default {
	path: 'userGroup/list',
	name: '用户组',
	hidden :false,
	icon: 'user-times',
	sign :true,
	component: Content,
	redirect: '/userManage/userGroup/list',
	children: [{
		path: '/userManage/userGroup/list',
		name: '用户组列表',
		icon: 'bar-chart',
		component: UserManage.userGroup.list
	 }
	]
};