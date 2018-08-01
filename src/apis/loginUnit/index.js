/**
 * 登录机构接口
 */
export default [
	{
		name:'获取机构列表',
		method:'getUnitList',
		type:'get',
	},
	{
		name:'获取最近一次登录的机构',
		method:'getLastUnitList',
		path:'/pass/org/getLastLoginUnitByAccount',
		type:'get',
	}
];