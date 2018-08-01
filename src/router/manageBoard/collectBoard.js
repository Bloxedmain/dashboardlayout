/**
 * @author James
 */

import {Content} from 'layout/';

import {manageBoard} from 'views/';

export default {
	path: 'collectBoard/collect',
	name: '收藏面板',
	hidden :false,
	icon: 'user-times',
	sign :true,
	component: Content,
	redirect: '/manageBoard/collectBoard/collect',
	children: [{
		path: '/manageBoard/collectBoard/collect',
		name: '面板管理',
		icon: 'bar-chart',
		component: manageBoard.collectBoard.collect
	 },
	]
};