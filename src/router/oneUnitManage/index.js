/**
 * Created by sailengsi on 2017/5/11.
 */

import OneUnitHome from 'views/OneUnitManage/OneUnitHome.vue';
import Content from 'views/OneUnitManage/Content.vue';
import Table from 'views/OneUnitManage/Table.vue';

import enableRoles from 'views/OneUnitManage/enableRoles/enableRoles.vue';
import shortCut from 'views/OneUnitManage/shortCut/shortCut.vue';
import dataAuthority from 'views/OneUnitManage/dataAuthority/dataAuthority.vue';


var oneunit_menu_routes = [
    {
        path: '/oneunit',
        component: Content,
        name: '官方流程',
        iconCls: 'fa fa-cog',//图标样式class
        children: [
            { path: '/table',iconCls: 'fa fa-caret-right', /*component: Main,*/ name: '组织架构申报'},
            { path: '/main1',iconCls: 'fa fa-caret-right', component: Table, name: '从业人员申报'},
            { path: '/main2',iconCls: 'fa fa-caret-right', /*component: Main,*/ name: '人员长证(三年期)'},
            { path: '/main3',iconCls: 'fa fa-caret-right', /*component: Main,*/ name: '人员短证(一年期)'},
            { path: '/main4',iconCls: 'fa fa-caret-right', /*component: Form,*/ name: '变更人员证' },
            { path: '/main5',iconCls: 'fa fa-caret-right', /*component: Main,*/ name: '注销人员证'},
            { path: '/main6',iconCls: 'fa fa-caret-right', /*component: user,*/ name: '遗失人员证' },
            { path: '/main7',iconCls: 'fa fa-caret-right', /*component: Main,*/ name: '人员短证'},
            { path: '/main8',iconCls: 'fa fa-caret-right', /*component: Table,*/ name: '人员临证'},
            { path: '/main9',iconCls: 'fa fa-caret-right', /*component: Form,*/ name: '人员施工证' },
            { path: '/main10',iconCls: 'fa fa-caret-right', /*component: user,*/ name: '从业车辆申报' },
            { path: '/main11',iconCls: 'fa fa-caret-right', /*component: user,*/ name: '车辆长证' },
            { path: '/main12',iconCls: 'fa fa-caret-right', /*component: user,*/ name: '车辆短证' },
            { path: '/main13',iconCls: 'fa fa-caret-right', /*component: user,*/ name: '注销车辆长证' }

        ]
    },
    {
        path: '/oneunit',
        component: Content,
        name: '自定流程',
        iconCls: 'fa fa-cog',
        children: [
            { path: '/page4',iconCls: 'fa fa-caret-right', /*component: Page4,*/ name: '自定流程A' },
            { path: '/page5',iconCls: 'fa fa-caret-right', /*component: Page5,*/ name: '自定流程B' }
        ]
    },
    {
        path: '/oneunit',
        component: Content,
        iconCls: 'fa fa-cog',
        leaf: true,//只有一个节点
        redirect: '/oneunit/role',
        children: [
            { path: '/role', component: enableRoles, name: '启用角色' }
        ]
    },
    {
        path: '/oneunit',
        component: Content,
        name: '',
        iconCls: 'fa fa-cog',
        leaf: true,//只有一个节点
        children: [
            { path: '/page3', component: dataAuthority, name: '数据权限' }
        ]
    },
    {
        path: '/oneunit',
        component: Content,
        name: '',
        iconCls: 'fa fa-cog',
        leaf: true,//只有一个节点
        children: [
            { path: '/page7', /*component: Page6,*/ name: '参数控制' }
        ]
    },
    {
        path: '/oneunit',
        component: Content,
        name: '',
        iconCls: 'fa fa-cog',
        leaf: true,//只有一个节点
        children: [
            { path: '/page8', /*component: Page6,*/ name: '组织架构' }
        ]
    },
    {
        path: '/oneunit',
        component: Content,
        name: '',
        iconCls: 'fa fa-cog',
        leaf: true,//只有一个节点
        children: [
            { path: '/shortcut', component: shortCut, name: '快捷方式' }
        ]
    },
    {
        path: '/oneunit',
        component: Content,
        name: '',
        iconCls: 'fa fa-cog',
        leaf: true,//只有一个节点
        children: [
            { path: '/page10', /*component: Page6,*/ name: '区域管理' }
        ]
    },
    {
        path: '/oneunit',
        component: Content,
        name: '',
        iconCls: 'fa fa-cog',
        leaf: true,//只有一个节点
        children: [
            { path: '/page11', /*component: Page6,*/ name: '证件类型' }
        ]
    }
	]
export default {
	path     : '/oneunit',
	name     : '单个机构管理页面',
	hidden   : true,
	component: OneUnitHome,
	redirect: '/oneunit/table',
	children:oneunit_menu_routes
};