/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

//import {UserManage} from 'views/';

export default {
	path: 'params',
	name: '分值管理',
	icon: 'inbox',
	component: Content,
	redirect: '/data/params/list',
	children: [{
		path: 'manage',
		name: '分值规则',
		icon: 'bar-chart'/*,
		component: UserManage.Unit.List*/
	},{
		path: 'import',
		name: '分值导入',
		icon: 'bar-chart'/*,
		component: UserManage.Unit.List*/
	}]
};