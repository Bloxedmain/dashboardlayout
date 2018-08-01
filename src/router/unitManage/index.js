/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';

import unit from './unit';
import unit1 from './unit1';
export default {
	path: '/unitManage',
	name: '单位',
	icon: 'inbox',
	hidden   : true,
	component: Home,
	redirect: '/unitManage/unit',
	children:[unit,unit1]
};