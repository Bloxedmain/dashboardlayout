/**
 * @author James
 */

import {Content} from 'layout/';

import {manageBoard} from 'views/';

export default {
	path: 'privateBoard/privateManage',
	name: '个人面板',
	hidden :false,
	icon: 'user-times',
	sign :true,
	component: Content,
	redirect: '/manageBoard/privateBoard/privateManage',
	children: [{
		path: '/manageBoard/privateBoard/privateManage',
		name: '面板管理',
		icon: 'bar-chart',
		component: manageBoard.privateBoard.privateManage
	 },
	]
};