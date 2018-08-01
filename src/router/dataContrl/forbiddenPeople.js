/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

import {ContrlData} from 'views/';

export default {
	path: 'params',
	name: '禁办人员',
	icon: 'inbox',
	component: Content,
	redirect: '/data/params/list',
	children: [{
		path: 'list',
		name: '禁办人员',
		icon: 'bar-chart',
		component: ContrlData.Forbidden.ForbiddenPeople
	}]
};