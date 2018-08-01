/**
 * @author James
 */

import {Home,Content} from 'layout/';

import userGroup from './userGroup';
import userList from './userList';
import userRole from './userRole';
export default {
	path: '/userManage',
	name: '用户',				
	icon: 'inbox',
	hidden   : true,
	component: Home,
	redirect: '/userManage/userGroup/list',
	children:[userGroup,userList,userRole]
};
