/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';

import unit from './unit';

export default {
	path: '/info',
	name: '流转信息',
	icon: 'inbox',
	hidden   : true,
	component: Home,
	redirect: '/info/params',
	children:[unit]
};