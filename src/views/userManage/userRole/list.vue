<template>
	<div id="list">
	<el-form :label-position="labelPosition" :inline="true" :model="filterForm" class="demo-form-inline searchContent">
	 <div class="content">  
	 <el-row :gutter="20">
	  <el-col :span="6">
	  	<div class="grid-content bg-purple">
	  		<el-form-item label="名称中有"  style="width: 100%;margin-bottom: 10px;">
		    <el-input v-model="filterForm.name" size="small"></el-input>
		  </el-form-item>
	  	</div>
	  </el-col>
	  <el-col :span="6">
	  	<div class="grid-content bg-purple">
		  <el-form-item label="类型" :label-width="formLabelWidth" prop="type_id">
			    	<el-select v-model="filterForm.type_id" 
			    		placeholder="请选择" style="width: 100%; margin-bottom: 10px">
					    <el-option
					      v-for="item in typeOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
			    </el-form-item>
	  	</div>
	  </el-col>
	  </el-row>
		  <el-row  >
	  <el-col :span='6'>
			  <el-form-item class="search">
			    <el-button type="primary" @click="onSubmit"  size="small">查询</el-button>
			  </el-form-item>
			  
			  <el-form-item class="cleanFilter">
			    <el-button type="primary" @click="oncleanFilter"  size="small">清除筛选</el-button>
			  </el-form-item>
			  </el-col>
			  
			   <el-col :span="3" :push="16">
			   	<el-form-item>
			   	 <el-button type="info" @click="addUserButton"  size="small"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加角色</el-button>
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
	  <el-table :data="tableData" border style="width: 100%">
	  	<el-table-column
	      type="index"
	      width="70">
	    </el-table-column>
	    <el-table-column prop="name" label="名称" >
	    </el-table-column>
	    <el-table-column prop="type" label="描述" :formatter="renderType">
	    </el-table-column>
	    <el-table-column prop="description" label="描述">
	    </el-table-column>
	    <el-table-column fixed="right" label="操作" >
	      <template slot-scope="scope">
	        <el-button @click="editRole(scope.row)"  size="small">编辑</el-button>
	        <el-button @click="editRole(scope.row)"  size="small">编辑成员</el-button>
	        <el-button @click="deleteRole(scope.row)" type="danger" size="small">删除</el-button>
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
	  <!--添加角色dialog begin-->
			<el-dialog title="编辑角色" :visible.sync="dialogFormVisible"
				 custom-class="editDialog"
				 :close-on-click-modal ="false"
				 size ="tiny">
			  <el-form :model="roleForm" :rules = "rules" ref="roleForm" >
			    <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
			      <el-input  v-model="roleForm.name"
			      	  auto-complete="off"style="width: 90%;">
			      </el-input>
			    </el-form-item>
			    <el-form-item label="类型" :label-width="formLabelWidth" prop="type_id">
			    	<el-select v-model="roleForm.type_id" 
			    		placeholder="请选择" style="width: 90%;">
					    <el-option
					      v-for="item in typeOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
			    </el-form-item>
			    <el-form-item label="描述"
			    	 :label-width="formLabelWidth" 
			    	 prop="description">
			      <el-input  type="textarea" 
			      	  v-model="roleForm.description"
			      	  :rows ="5"
			      	 auto-complete="off"
			      	 style="width: 90%;"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="cancelEdit('roleForm')">取 消</el-button>
			    <el-button type="primary" @click="addUserRole('roleForm')">确 定</el-button>
			  </div>
			</el-dialog>
	 <!-- 编辑角色dialog end-->
	
     <!--
     	作者：offline
     	时间：2017-07-31
     	描述：删除确认
     -->
	</div>
</template>
<script>
	import listJS from './list.js';
    export default listJS;
</script>
<style scoped  lang="less">
    #list{
    	font-family: "微软雅黑";
    	  .discribe{
  	       font-family: "微软雅黑";
  	       line-height: 30px;
         }
         .table{
         }
         .title{
         	
         }
         .searchContent{
         	.content{
         		
         	}
         	.title{
         		
         	}
         .search{
         	padding-left: 0px;
         }
         .clean{
         	padding-left: 25px;
         }
         }
         
    }
</style>