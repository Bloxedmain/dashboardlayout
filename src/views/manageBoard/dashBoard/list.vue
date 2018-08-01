<template>
	<div id="list">
	<el-form :label-position="labelPosition" :inline="true" :model="boardForm" class="demo-form-inline searchContent">
		<el-row class='title' style="display: none;">
			<el-col><div class="grid-content bg-purple-dark title">面板搜索</div></el-col>
		</el-row>
	 <div class="content">  
	 <el-row :gutter="20">
	  <el-col :span="6">
	  	<div class="grid-content bg-purple">
	  		<el-form-item label="面板名称" style="width: 100%;margin-bottom: 10px;">
		    <el-input v-model="boardForm.name" size="small"></el-input>
		  </el-form-item>
	  	</div>
	  </el-col>
	 </el-row>
	 <el-row :gutter="20">
	  <el-col :span="6">
	  	<div class="grid-content bg-purple">
	  		<el-form-item label="拥有者" style="width: 100%;margin-bottom: 10px;">
		    <el-input v-model="boardForm.owner" size="small"></el-input>
		  </el-form-item>
	  	</div>
	  </el-col>
	  </el-row>
	  <el-row>
	  <el-col :span='6'>
			  <el-form-item class="search">
			    <el-button type="primary" @click="onQuery"  size="small">查询</el-button>
			  </el-form-item>
			  
			  <!--<el-form-item class="clean">
			    <el-button type="primary" @click="onClean"  size="small">清除筛选</el-button>
			  </el-form-item>-->
			  
			   
			 </el-col>
			 <el-col :span="3" :push="15">
			 	<el-form-item class="adduser">
			   	 <el-button type="info" @click="creatBoard"  size="small"><i class="el-icon-plus"></i>&nbsp;&nbsp;创建新面板</el-button>
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
	  <el-table :data="tableData"
	  	 @cell-click="routerDash"
	  	 style="width: 100%;margin-bottom: 10px;">
	    <el-table-column prop="name" class-name="cloumnS" label="名称" >
	    </el-table-column>
	    <el-table-column prop="owner" label="拥有者">
	    </el-table-column>
	    <el-table-column prop="property" label="属性">
	    </el-table-column>
	    <el-table-column fixed="right" label="操作" >
	      <template slot-scope="scope">
	        <el-button @click="editBoard(scope.row)" type="" size="small">编辑</el-button>
	        <el-button @click="deleteBoard(scope.$index,tableData)" type="danger" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  </div>
	  <!--dialog对话框-->
	  <el-dialog
		  :title="dialogForm.title"
		  :visible.sync="dialogVisible"
		  size="small"
		  :show-close="true"
		  :before-close="handleClose">
			   <el-form :model="dialogForm" :rules="rules" ref="dialogForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="名称" prop="name">
				    <el-input type="text" v-model="dialogForm.name" auto-complete="off" style="width:70%"></el-input>
				  </el-form-item>
				  <el-form-item label="描述" prop="description">
				    <el-input type="textarea" v-model="dialogForm.description" style="width:70%" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="共享" prop="property">
				    <el-input v-model.number="dialogForm.property" style="width:70%"></el-input>
				  </el-form-item>
				  <el-form-item>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancle('dialogForm')">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import listJS from "./list.js";
	export default listJS
</script>
<style   lang="less">
	 
    #list{
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
       .cloumnS{
       	cursor: pointer;
    	color: #2E8BFF;
    }  
    }
    
</style>