/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';

import unit from './unit';

export default {
	path: '/systemParam',
	name: '系统',
	icon: 'inbox',
	hidden   : true,
	component: Home,
	redirect: '/systemParam/params',
	children:[unit]
};