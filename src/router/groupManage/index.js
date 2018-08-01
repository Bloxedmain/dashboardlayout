/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';

import orgStructure from './orgStructure';

export default {
	path: '/groupManage',
	name: '架构',
	hidden   : true,
	icon: 'inbox',
	component: Home,
	redirect: '/groupManage/structure',
	children:[orgStructure]
};