/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

//import {UserManage} from 'views/';

export default {
	path: 'params',
	name: '信息审批',
	icon: 'inbox',
	component: Content,
	redirect: '/info/params/list',
	children: [{
		path: 'list',
		name: '审批列表',
		icon: 'bar-chart'/*,
		component: UserManage.Unit.List*/
	}]
};