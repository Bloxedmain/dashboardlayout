/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

//import {GroupManage} from 'views/';

export default {
	path: 'group',
	name: '组织架构',
	icon: 'inbox',
	component: Content,
	redirect: '/groupManage/group/list',
	children: [{
		path: 'list',
		name: '组织管理',
		icon: 'bar-chart'/*,
		component: GroupManage.Group.List*/
	}]
};