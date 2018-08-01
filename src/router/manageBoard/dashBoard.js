/**
 * @author James
 */

import {Content} from 'layout/';

import {manageBoard} from 'views/';
export default {
	path: 'dashBoard/list',
	name: '面板查看',
	hidden :false,
	icon: 'user-times',
	sign :true,
	component: Content,
	redirect: '/manageBoard/dashBoard/list',
	children: [{
		path: '/manageBoard/dashBoard/list',
		name: '面板管理',
		icon: 'bar-chart',
		component: manageBoard.dashBoard.list
	 },
	]
};