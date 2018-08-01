/**
 * @author James
 */

import {Home,Content} from 'layout/';

import dashBoard from './dashBoard';
import privateBoard from './privateBoard';
import collectBoard from "./collectBoard";
export default {
	path: '/manageBoard',
	name: '面板',				
	icon: 'inbox',
	hidden   : false,
	component: Home,
	redirect: '/manageBoard/dashBoard/list',
	children:[dashBoard,privateBoard,collectBoard]
};
