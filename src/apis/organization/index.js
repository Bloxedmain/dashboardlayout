/**
 * 组织架构
 */
export default [
	{
		name:'添加机构',
		method:'addChildOrganization',
		path:'/pass/organization/addChildOrganization',
		type:'post',
	},
	{
		name:'获取所有机构',
		method:'findAllOrganizations',
		path:'/pass/organization/findAllOrganizations',
		type:'get',
	},{
		name:'获取树状机构',//树节点的一级子节点
		method:'listPassOrganizations',
		path:'/pass/organization/listPassOrganizations',
		type:'get'
	},{
		name:'以主键查询机构',//树节点的表单详情
		method:'findOrgById',
		path:'/pass/organization/findOrgById',
		type:'get'
	}
];