/**
 * @author shangyc
 */

/**
 * 机构管理模块
 * @type {Object}
 */
export default [
                /**
                 * 机构接口
                 */
                {
                	name  :"查询机构列表",
                	method:"findallunit",
                	path  :"/pass/org/units/findallunit",
                	type  :"get"
                },
                {
                    name  :"新增机构",
                    method:"addUnitAndProp",
                    path  :"/pass/org/units/addUnit",
                    type  :"post"
                },
                {
                    name  :"编辑机构",
                    method:"UnitEdit",
                    path  :"/pass/org/units",
                    type  :"put"
                },
                {
                    name:'删除机构',
                    method:'delete',
                    path:'/pass/org/units/delete/',
                    type:'delete'
                },{
                    name:'过滤查询',
                    method:'filterActiveUnits',
                    path:'/pass/org/units/filterActiveUnits',
                    type:'post'
                }
               /**
                * 角色接口
                */ 
                /*{
                	name  :"获取有效角色",
                	method:"getsearchroles",
                	path  :"/org/roles/page",
                	type  :"post"
                },{
                	name  :"添加角色",
                	method:"addroles",
                	path  :"/org/roles/",
                	type  :"get"
                },*/
                
                
               
];