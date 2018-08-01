/**
 * @author shangyc
 */

/**
 * 用户管理模块
 * @type {Object}
 */
export default [
                {
                    name  : '查找用户组列表',
                    method: 'getUserGroup',
                    path  : '/org/usergroup/list',
                    type  : 'post',
                },{
                    name  : '分页查询用户组列表',
                    method: 'getUserGroupbypage',
                    path  : '/org/usergroup/listbypage',
                    type  : 'post',
                },{
                	name  :"添加用户组",
                	method:'addUserGroup',
                	path  :'/org/usergroup/add',
                	type  :"post"
                	
                }, {
                	name  :"删除用户组",
                	method:'deleteUserGroup',
                	path  :'/org/usergroup/delete',
                	type  :"post"
                	
                }, {
                	name  :"修改用户组",
                	method:'updateUserGroup',
                	path  :'/org/usergroup/update',
                	type  :"post"
                	
                }, {
                	name  :"根据ID查询用户组",
                	method:'getByIdUserGroup',
                	path  :'/org/usergroup/findbyid',
                	type  :"post"
                	
                }, {
                	name  :"模糊查询用户组",
                	method:"getByNameUserGroup",
                	path  :"/org/usergroup/findbylikename",
                	type  :"post"
                },
                
                /**
                 * 用户接口
                 */
                {  name   :"添加用户信息及属性",
                   method :"addUserAndProp",
                   path   :"pass/org/user/addUserAndProp",
                   type   :"post"
                },
                {
                	name  :"查询有效用户",
                	method:"getsearchValidusers",
                	path  :"pass/org/user/listAllValidUsers",
                	type  :"post"
                }, {
                	name  :"修改用户信息",
                	method:"editUserMessage",
                	path  :"pass/org/user/updateUserAndProp",
                	type  :"put"
                }, {
                	name  :"根据条件查询用户",
                	method:"filterUser",
                	path  :"pass/org/user/filterActiveUsers",
                	type  :"post"
                },{
                	name  :"删除用户",
                	method:"deleteUser",
                	path  :"/pass/org/user/deleteuser",
                	type  :"post"
                },
               /**
                * 角色接口
                */ 
                {
                	name  :"获取有效角色",
                	method:"getsearchroles",
                	path  :"pass/org/roles/",
                	type  :"get"
                },{
                	name  :"分页查询角色",
                	method:"getsearchrolesbypage",
                	path  :"pass/org/roles/listRolesByPage",
                	type  :"post"
                },{
                	name  :"添加角色",
                	method:"addroles",
                	path  :"pass/org/roles/",
                	type  :"post"
                },{
                	name  :"删除系统角色",
                	method:"deleteUserRole",
                	path  :"pass/org/roles/",
                	type  :"delete"
                },{
                	name  :"修改角色",
                	method:"editUserRole",
                	path  :"pass/org/roles/",
                	type  :"put"
                }
                
               
];