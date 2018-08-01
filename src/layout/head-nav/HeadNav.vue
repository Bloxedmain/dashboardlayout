<template>
    <div>
        <header class="head-nav">
            <el-row>
                <el-col :span="1" class='logo-container'>
                    <img src="#" class='logo' alt="">
                </el-col>
                <el-col :span="3" class="logo-text">
                    <!-- <span>空防办证配置中心</span> -->
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link" >
                        <span v-text="UnitName"></span><i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in unitItems" v-text="item.description" :command="item" :key="item.code"></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="16">
                    <el-menu  :default-active="$store.state.router.headerCurRouter" class="el-menu-demo"
                             mode="horizontal" unique-opened router>
                        <!-- v-if='!item.hidden && (($store.state.user.userinfo.access_status===1 && $store.state.user.userinfo.web_routers[item.path]) || $store.state.user.userinfo.access_status!==1)' -->
                        <el-menu-item
                                v-for='(item,index) in $router.options.routes'
                                :index="item.path"
                                :key='item.path'
                                v-if='!item.hidden && (($store.state.user.userinfo.access_status===1 && $store.state.user.userinfo.web_routers[item.path]) || $store.state.user.userinfo.access_status!==1)'>
                            {{item.name}}<!-- {{item.path}} -->
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <!-- <span class='username'><i class='fa fa-user'></i>{{this.$store.state.user.userinfo.username}}</span> -->
                    <span class='username'>
                        <el-dropdown
                                trigger="click"
                                @command='setDialogInfo'>
                            <span class="el-dropdown-link">
                                {{this.$store.state.user.userinfo.username}}<i
                                    class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                                <el-dropdown-item
                                        command='set'
                                        v-if='$store.state.user.userinfo.pid==0'>系统设置</el-dropdown-item>
                                <el-dropdown-item v-if="$store.state.user.userinfo.username"
                                        command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <i class="fa fa-sign-out logout" @click='logout'></i>
                </el-col>
            </el-row>
        </header>
    </div>
</template>

<script>
	import HeadNavJs from './HeadNav.js';
	export default HeadNavJs;
</script>

<style scoped lang='less'>
    .logo-container {
        height: 60px;
    }
    .logo-text{
        height:60px;
        line-height:60px;
        padding-right: 5px;
        text-align: center;
    }
    .logo {
        height: 50px;
        width: auto;
        margin-left: 7px;
        margin-top: 5px;
    }
     .el-menu-demo{
     	background-color:#0F78EE ;
     	color: #FFFFFF;
     }
    .fa-user {
        position: relative;
        top: -2px;
        margin-right: 4px;
    }
    .el-dropdown {
        color: #eef1f6;
        font-size: 14px;
    }
    .head-nav {
        width: 100%;
        height: 60px;
        background: #0F78EE;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 99;
        color: #FFF;

    .logout {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        float: right;
        cursor: pointer;
    }

    }
    .userinfo {
        text-align: right;
    }
    .username {
        height: 60px;
        line-height: 60px;
        cursor: pointer;
    }
    .el-menu-item{
    	color: #FFFFFF;
    }
    .is-active{
    	background-color: #FFFFFF;
    	color: #0E77ED !important;
    }
    .el-menu--horizontal>.el-menu-item:hover{
    	background-color: #FFFFFF;
    	color: #0E77ED !important;
    }
    .el-menu--horizontal>.el-menu-item{
    	border: none;
    }
</style>
