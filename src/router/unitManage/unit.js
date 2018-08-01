/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

import {UnitManage} from 'views/';

export default {
	path: 'unit',
	name: '机构',
	icon: 'inbox',
	component: Content,
	redirect: '/unitManage/unit/list',
	children: [{
		path: 'list',
		name: '机构列表',
		icon: 'bar-chart',
		component: UnitManage.Unit.List
	},{
		path: 'type',
		name: '机构类别',
		icon: 'bar-chart',
		component: UnitManage.Unit.Type
	}]
};