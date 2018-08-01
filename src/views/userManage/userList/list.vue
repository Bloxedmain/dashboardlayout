<template>
	<div class="list">
	<el-form :label-position="labelPosition" :inline="false" :model="filterForm" ref="filterForm" class="demo-form-inline searchContent">
	 <div class="content">  
	 <el-row  type="flex" class="row-bg" justify="space-between" :gutter="20">
	   <el-col :span="6">
	  	<div class="grid-content bg-purple">
	  		<el-form-item label="账户名中有">
		    <el-input v-model="filterForm.account"  size="small"></el-input>
		  </el-form-item>
	  	</div>
	  </el-col>
	  <el-col :span="6">
	  	<div class="grid-content bg-purple">
	  		<el-form-item label="用户名中有">
		    <el-input v-model="filterForm.full_name"  size="small"></el-input>
		  </el-form-item>
	  	</div>
	  </el-col>
	  <el-col :span="6">
	  	<div class="grid-content bg-purple-light">
	  		 <el-form-item label="状态">
		    <el-select 
		    	v-model="filterForm.status"
		    	size="small">
		      <el-option label="启用" value="0" size="small"></el-option>
		      <el-option label="禁用" value="1" size="small"></el-option>
		    </el-select>
		  </el-form-item>
	  	</div>
	  </el-col>
	  <el-col :span="6">
	  	<div class="grid-content bg-purple-light">
	  		 <el-form-item label="用户组">
			    <el-select v-model="usergroupvalue" 
			    	filterable
			    	multiple 
			    	remote 
			    	placeholder="输入查询内容"
			    	size="small"
			    	:remote-method="filterUsergroup"
	                :loading="loading">
			      <el-option v-for="item in userlist"  
			      	:label="item.group_name" 
			      	:value="item.id" 
			      	:key = "item.id"
			      	size="small"></el-option>
			    </el-select>
		  </el-form-item>
	  	</div>
	  </el-col>
	  </el-row>
	  <el-row type="flex" class="row-bg" justify="space-between" :gutter="20">
	  <el-col :span="6">
	  	<div class="grid-content bg-purple">
	  		<el-form-item label="动态秘钥">
		    <el-input v-model="filterForm.user_sequence_encryption"  size="small"></el-input>
		  </el-form-item>
	  	</div>
	  </el-col>
	  </el-row>
	  <el-row>
	  	<el-col :span='1' :offset="0">
			  <el-form-item class="search">
			    <el-button :plain="true" type="info" @click="searchUser"  size="small">查询</el-button>
			  </el-form-item>
			  </el-col>
			  <el-col :span="3":offset="0">
			  <el-form-item class="clean">
			    <el-button type="primary" @click="onClean('filterForm')"  size="small">清除筛选</el-button>
			  </el-form-item>
			  </el-col>
			  <el-col :span="3":push="17" style="padding-left: 5%;">
			   	<el-button type="info" @click="addUserButton"  size="small"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加用户</el-button>
			   	</el-col>
	  </el-row>
	  </div>
	</el-form>
	  <!--
      	作者：offline
      	时间：2017-08-01
      	描述：table show
      -->
	  <div  class="table">
	  <el-table :data="tableData" border  style="width: 100%">
		    <el-table-column type="index" label="No" width="80">
		    </el-table-column>
		    <el-table-column prop="account" label="账户名" >
		    </el-table-column>
		    <el-table-column prop="full_name" label="用户名" >
		    </el-table-column>
		    <el-table-column prop="user_sequence_encryption"  label="动态秘钥" >
		    </el-table-column>
		    <el-table-column prop="user_validity_due" :formatter="formatValidity" label="有效期至" >
		    </el-table-column>
		    <el-table-column  :formatter="renderStatus" label="状态">
		    </el-table-column>
		    <el-table-column fixed="right" label="操作" width="300">
		      <template slot-scope="scope">
		        <el-button @click="handleClick(scope.row)"  size="small">用户组</el-button>
		        <el-button @click="handleClick(scope.row)"  size="small">{{scope.row.deleted==0 ? "禁用" :"启用"}}</el-button>
		        <el-button @click="editMember(scope.row)"  size="small">编辑</el-button>
		        <el-button @click="deleteUser(scope.row)" type="danger" size="small">删除</el-button>
		      </template>
	    </el-table-column>
	  </el-table>
	  </div>
	   <!--分页显示-->
	   <el-row>
	   	<el-col :span='12' :offset="12">
		   <div class="block"  style='float: right;padding-top: 50px;'>
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-sizes="pageSizes"
			      :page-size="pageSize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total_count">
			    </el-pagination>
			  </div>
			</el-col>  
		 </el-row>
	  <!--添加用户dialog begin-->
		<el-dialog :title="userDialogTitle" :visible.sync="dialogFormVisible"
			 custom-class="editDialog"
			 :close-on-click-modal="false"
			 :before-close = "cleanContent"
			 :show-close = "false"
			 size='tiny'>
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
		    <el-form-item label="账户名"  prop="account"  label-width="100px" >
		    	<el-col :span="20">
		      <el-input v-model="ruleForm.account" ></el-input>
		      </el-col>
		    </el-form-item>
		    <el-form-item label="用户名"  label-width="100px"  prop="full_name">
		    	<el-col :span="20">
		      <el-input v-model="ruleForm.full_name" ></el-input>
		      </el-col>
		    </el-form-item>
		    <el-form-item label="有效期至"  label-width="100px"  prop="user_validity_due">
		    	<el-col :span="20">
				<el-date-picker
				      v-model="ruleForm.user_validity_due"
				      type="date"
				      placeholder="选择日期"
				      format  = "yyyy-MM-dd"
				      :picker-options="pickerOptions0"
				      style="width:100%">
				   </el-date-picker>
			    </el-col>
		    </el-form-item>
		    <el-form-item label="联系电话"  label-width="100px"   prop="phone">
		    	<el-col :span="20">
		      <el-input v-model="ruleForm.phone" ></el-input>
              	</el-col>	      
		    </el-form-item>
		    <el-form-item label="手机"  label-width="100px"   prop="user_mobile">
		    <el-col :span="20">
		      <el-input v-model="ruleForm.user_mobile"></el-input>
		      </el-col>
		    </el-form-item>
		    <el-row>
		    <el-col :span="21">
		    <el-form-item label="动态秘钥"  label-width="100px"   prop="user_sequence_encryption">
		      <el-input v-model="ruleForm.user_sequence_encryption"></el-input>
		      </el-form-item>
		      </el-col>
		      <el-col :span="3" >
		      <i class="el-icon-information" size='large' @mouseover='codeOver'  @mouseout='codeOut' style='width:30px;height:30px;padding: 10px 0px 0px 10px; cursor: pointer;'></i>
		      </el-col>
		    </el-row>
		    <!--动态秘钥图-->
		    
		    <div id="trendsCode">
		    <transition-group enter-active-class="bounceInLeft" leave-active-class="bounceOutLeft">	
		    	<div   v-show="codeShow"  class="animated imgDiv" :key="1">
		    	<img src="../../../assets/trendscode.png"/>
		    	</div>
		    	</transition-group>
		    </div>
		    
		    <el-form-item label="公司签章"  label-width="100px">
		    <el-col :span="20">
		       <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
				  <el-button size="small" type="primary">上传公司签章</el-button>
				  <div slot="tip" class="el-upload__tip" v-show='false'>只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
		      </el-col>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancledialog('ruleForm')">取 消</el-button>
		    <el-button type="primary" @click="addUserSure('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>
	 <!-- 编辑用户组dialog end-->
	</div>
</template>
<script>
	import listJS from './list.js';
    export default listJS;
</script>
<style scoped  lang="less">
  @import url("animate.css" );
    .list{
    	font-family: "微软雅黑";
    	  .discribe{
    	  	
    	  }
         .table{
         	
         }
         .title{
         	
         }
         .el-dialog{
         	border-radius: 8px;
         }
         .deletedialog{
         	border-radius: 5px;
         }
         .searchContent{
         	.el-form-item{
         	width: 100%;
         	margin-bottom: 10px;
         	}
         	.el-select{
         		width: 100%;
         	}
         .search{
         	padding-left: 0px;
         }
         .clean{
         	padding-left: 25px;
         }
         }
         #trendsCode{
         	position: fixed;
         	top: 300px;
         	left: 370px;
         	width: 256px;
         	height: 180px;
         	overflow: hidden;
         	border-radius:4px;
         .imgDiv{
            img{
            	width: 260px;
            	height: 180px;
            }
         }
         }
    }
         
</style>