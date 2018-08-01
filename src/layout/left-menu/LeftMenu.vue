<template>
    <div class="left" :style="{'height':win_size.height,'width':$store.state.leftmenu.width}" id='admin-left'>
        <div id='left-menu'>
            <el-row class='tac' 
                    v-for="(route,index) in $router.options.routes"
                    :key='route.path'
                    v-if='!route.hidden && $route.matched.length && $route.matched[0].path===route.path'>
                <el-col :span="24">
                    <el-menu
                            class="el-menu-vertical-demo"
                            :default-active="$route.path"
                            unique-opened
                            router>
                        <template
                                v-for="(item,index) in route.children"
                                v-if="!item.hidden && !item.sign &&　item.children && route.children && (($store.state.user.userinfo.access_status===1 && $store.state.user.userinfo.web_routers[route.path+'/'+item.path]) || $store.state.user.userinfo.access_status!==1)">
                            <el-submenu
                                    :index="item.path">
                                <template
                                        slot="title">
                                        <!--父图标-->
                                    <el-tooltip
                                            class="item"
                                            effect="dark"
                                            placement="right"
                                            :disabled="$store.state.leftmenu.menu_flag"
                                            :content="item.name">
                                        <i :class="'fa fa-'+item.icon"
                                        	></i>
                                    </el-tooltip>
                                    <span
                                            class='menu-name'
                                            v-if="$store.state.leftmenu.menu_flag">{{item.name}}
                                       </span>
                                </template>
                                <el-menu-item
                                        v-for='(child,cindex) in item.children'
                                        :key='child.path'
                                        v-if="!child.hidden  && (($store.state.user.userinfo.access_status===1 && $store.state.user.userinfo.web_routers[route.path+'/'+item.path+'/'+child.path]) || $store.state.user.userinfo.access_status!==1)"
                                        :style="{'padding-left':$store.state.leftmenu.menu_flag? '40px' : '23px'}"
                                        :index='$store.state.router.headerCurRouter+"/"+item.path+"/"+child.path'>
                                    <!--子图标-->
                                    <el-tooltip
                                            class="item"
                                            effect="dark"
                                            placement="right"
                                            :disabled="$store.state.leftmenu.menu_flag"
                                            :content="child.name">
                                        <i :class="'fa fa-'+child.icon"></i>
                                    </el-tooltip>
                                    <span
                                            class='menu-name'
                                            v-if="$store.state.leftmenu.menu_flag">{{child.name}}
                                        </span>
                                </el-menu-item>
                            </el-submenu>
                        </template>
                         <el-menu-item
                         	         v-for="(item,index) in route.children"
                                     :key="item.path"
                                     v-if="!item.hidden && item.sign && item.children && route.children"
                                     :default-active="$route.path"
                                     :index='$store.state.router.headerCurRouter+"/"+item.path'
                                      router>
                                    <!--子图标-->
                                    <el-tooltip
                                            class="item"
                                            effect="dark"
                                            placement="right"
                                            :disabled="$store.state.leftmenu.menu_flag"
                                            :content="item.name">
                                        <i :class="'fa fa-'+item.icon"></i>
                                    </el-tooltip>
                                    <span
                                            class='menu-name'
                                            v-if="$store.state.leftmenu.menu_flag">{{item.name}}
                                        </span>
                                </el-menu-item>                     
                    </el-menu>
                </el-col>
            </el-row>
            <div class="toggle-menu"
                 @click='toggleMenu'
                 :style='{left:$store.state.leftmenu.width}'>
                <i :class='[{"el-icon-arrow-left":$store.state.leftmenu.menu_flag},{"el-icon-arrow-right":!$store.state.leftmenu.menu_flag}]'></i>
            </div>
        </div>
    </div>
</template>

<script>
    import LeftMenu from './LeftMenu.js';
    export default LeftMenu;
</script>

<style scoped lang='less'>
    @import url(./LeftMenu.less);
</style>
