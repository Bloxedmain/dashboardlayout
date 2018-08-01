<template>
 <div class="home">
	<head-nav></head-nav>
    <div class="grid-content bg-purple-dark unit-title" >
        <strong v-text="unitName"></strong>
    </div>
	<template>
	  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="tabs">
	    <el-tab-pane label="门户" name="first">门户</el-tab-pane>
	    <el-tab-pane label="管理" name="second">
	    	<el-row :gutter="20" class="main" style="width:100%;">
	    		<el-col :span="4">
				<aside :class="collapsed?'menu-collapsed':'menu-expanded'"  class="oneunit-leftmenu">
					<!--导航菜单-->
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
						 unique-opened router v-show="!collapsed">
						<template v-for="(item,index) in $router.options.routes[0].children" v-if="!item.hidden">
							<el-submenu :index="index+''" v-if="!item.leaf">
								<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
								<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i :class="child.iconCls"></i>{{child.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
						</template>
					</el-menu>
				</aside>
				</el-col>
				<el-col :span="20" style="margin-top:20px;">
				<section class="content-container">
					<div class="grid-content bg-purple-light">
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
					</div>
				</section>
				</el-col>
			</el-row>
	    </el-tab-pane>
	  </el-tabs>
	  </template>
</div>
</template>

<script>
import HeadNav from '../../layout/head-nav/HeadNav.vue';

export default {
	name   : 'OneUnitHome',
	data() {
		return {
			collapsed:false,
			activeName: 'second',
			unitName:'候机楼办证中心',
			win_size: {
                height: '',
            }

		}
	},
	components:{
        HeadNav
    },
     created() {
        this.setSize();
        this.$$lib_$(window).resize(() => {
            this.setSize();
        });
    },
	mounted(){
	  	//console.log(this.$router.options.routes[0].children);
	  	this.setSize();
        this.$$lib_$(window).resize(() => {
            this.setSize();
        });
   },
   methods:{
    	handleClick(tab, event) {
	        console.log(tab, event);
	    },
	    handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleselect: function (a, b) {
		},
		setSize() {
            this.win_size.height = this.$$lib_$(window).height() + "px";
        }
    }
}
</script>

<style>
	.fa{
		padding-right:5px;
	}
    .unit-title{
        width: 100%;
        height:55px;
        line-height: 55px;
        padding-left:30px;
        /*position: fixed;
    	top: 60px;*/
    	margin-top:60px;
    	background-color: #eef1f6;
    }
    .tabs{
    	width:100%;
    	/*position:fixed;
    	top:115px;*/
    }
    .oneunit-leftmenu .el-menu{
    	background-color: #ffffff;
    }
    .el-menu-item, .el-submenu__title {
	    height: 45px;
	    line-height: 45px;
	}
    .el-tabs__header{
    	margin: 0px;
    }
    .el-submenu .el-menu-item {
	    height: 40px;
	    line-height: 40px;
	}
	.el-menu-item, .el-submenu__title {
	    height: 50px;
	    line-height: 50px;
	}
	.oneunit-leftmenu{
		/*background-color: #eef1f6;*/
		overflow-x: hidden;
	}
	.el-tabs__nav-wrap {
	    margin-bottom: -2px;
	}
	.el-tabs--border-card>.el-tabs__content {
	     padding: 0; 
	}
	.el-tabs--border-card {
	    background: #fff;
	     border-top: none; 
	}
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>