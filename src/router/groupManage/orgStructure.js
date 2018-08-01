/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

import {groupManage} from 'views/';

export default {
	path: 'Structure',
	name: '组织架构管理',
	icon: 'inbox',
	component: Content,
	redirect: '/groupManage/Structure/list',
	children: [{
		path: 'list',
		name: '组织管理',
		icon: 'bar-chart',
		component: groupManage.groupManage.List
	}]
};