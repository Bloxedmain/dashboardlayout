<template>

<div style=" width:100%;margin:auto">
	 <div v-show="count.config=='browse'">
		  <el-table
		    :data="tableData"
		    border
		    style="width: 100%"
		    :default-sort = "{prop: 'date', order: 'descending'}"
		    >
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      sortable
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="code"
		      label="证件号">
		    </el-table-column>
		    <el-table-column
		      prop="score"
		      label="分值">
		    </el-table-column>
		  </el-table>
	  </div>
	  <div   v-show="count.config=='edit'" >
  	   <el-form label-position="top" :inline="true" :model="filterForm" class="demo-form-inline searchContent">
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
						  <el-form-item label="类型" label-width="top" prop="type_id">
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
							    <el-button type="primary" @click="onfilter"  size="small">过滤</el-button>
							  </el-form-item>
							  
							  <el-form-item class="cleanFilter">
							    <el-button type="primary" @click="oncleanFilter"  size="small">取消</el-button>
							  </el-form-item>
							 </el-col>
					  </el-row>
					  </div>
					</el-form>
	  </div>
  </div>
</template>

<script>
	import privateScoreTopJs from "./privateScoreTop.js";
	export default privateScoreTopJs
</script>

<style lang="less" scoped="scoped">
 .searchContent{
 	margin-top: 30px;
 	padding-left: 20px;
 }
</style>