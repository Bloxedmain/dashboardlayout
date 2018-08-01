<template>
	<div id="list">
	<el-form :label-position="labelPosition" :inline="true" :model="formInline" class="demo-form-inline searchContent">
		<el-row class='title' style="display: none;">
			<el-col><div class="grid-content bg-purple-dark title">用户组搜索</div></el-col>
		</el-row>
	 <div class="content">  
	 <el-row>
	  <el-col :span="6">
	  	<div class="grid-content bg-purple">
	  		<el-form-item label="名称中有" style="width: 100%;margin-bottom: 10px;">
		    <el-input v-model="formInline.name" size="small"></el-input>
		  </el-form-item>
	  	</div>
	  </el-col>
	  </el-row>
	  <el-row>
	  <el-col :span='6'>
			  <el-form-item class="search">
			    <el-button type="primary" @click="onSubmit"  size="small">查询</el-button>
			  </el-form-item>
			  
			  <el-form-item class="clean">
			    <el-button type="primary" @click="onClean"  size="small">清除筛选</el-button>
			  </el-form-item>
			  
			   
			 </el-col>
			 <el-col :span="3" :push="15">
			 	<el-form-item class="adduser">
			   	 <el-button type="info" @click="addUserButton"  size="small"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加用户组</el-button>
			   	 </el-form-item>
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
	  <el-table :data="tableData" border style="width: 100%;margin-bottom: 10px;">
	    <el-table-column prop="group_name" label="名称" >
	    </el-table-column>
	    <el-table-column prop="created" label="创建时间">
	    </el-table-column>
	    <el-table-column fixed="right" label="操作" >
	      <template slot-scope="scope">
	        <el-button @click="handleClick(scope.row)"  size="small">编辑</el-button>
	        <el-button @click="handleMember(scope.row)"  size="small">编辑成员</el-button>
	        <el-button @click="deleteUserGroup(scope.row)" type="danger" size="small">删除</el-button>
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
	  <!--添加用户组dialog begin-->
			<el-dialog title="编辑用户组" :visible.sync="dialogFormVisible" class="editDialog" style='border-radius: 6px;'>
			  <el-form :model="form" :rules = "rules" ref="form" >
			    <el-form-item label="用户组名称" :label-width="formLabelWidth" prop="group_name">
			      <el-input  v-model="form.group_name"  auto-complete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addUserGroup('form')">确 定</el-button>
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
    #list{
    	.editDialog{
         	border-radius: 8px;
         }
    	font-family: "微软雅黑";
    	  .discribe{
  	       font-family: "微软雅黑";
  	       line-height: 30px;
         }
         .searchContent{
         .search{
         	padding-left: 0px;
         }
         .clean{
         	padding-left: 15px;
         }
         .adduser{
         	padding-left: 28%;
         }
         }
         
    }
</style>