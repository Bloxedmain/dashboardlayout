/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

//import {GroupManage} from 'views/';

export default {
	path: 'params',
	name: '参数管理',
	icon: 'inbox',
	component: Content,
	redirect: '/systemParam/params/list',
	children: [{
		path: 'list',
		name: '参数列表',
		icon: 'bar-chart'/*,
		component: GroupManage.Group.List*/
	}]
};