/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

import {UnitManage} from 'views/';

export default {
	path: 'params',
	name: '机构1',
	icon: 'inbox',
	hidden:false,
	sign :true,
	component: Content,
	redirect: '/UnitManage/Unit/list',
	children: [{
		path: 'list',
		name: '机构列表1',
		hidden:false,
		icon: 'bar-chart'/*,
		component: UnitManage.Unit.List*/
	}]
};