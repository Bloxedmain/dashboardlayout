/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';

import forbiddenPeople from './forbiddenPeople';
import scoreManage from './scoreManage';
export default {
	path: '/data',
	name: '参数设置',
	icon: 'inbox',
	hidden   : true,
	component: Home,
	redirect: '/data/params',
	children:[forbiddenPeople,scoreManage]
};