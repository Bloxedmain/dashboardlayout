<template>
    <div class="list">
        <el-form :label-position="labelPosition" label-width="80px" :model="formData" ref="formData" :inline="true" >
        <el-row>
          <el-col :span="5">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formData.name" size="small"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="5">
          <el-form-item label="证件号码" prop="cardId" >
            <el-input v-model="formData.cardId" size="small"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="5">
          <el-form-item label="状态" prop="status" >
            <el-select v-model="formData.status" placeholder="请选择" clearable size="small">
              <el-option label="生效" value="1"></el-option>
              <el-option label="失效" value="2"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="5" style="padding-left:20px;">
          <el-form-item label="导入时间" prop="importTime" >
            <el-date-picker
              v-model="formData.importTime"
              type="datetimerange"
              :picker-options="formData.pickerOptions2"
              placeholder="选择时间范围"
              align="right">
            </el-date-picker>
          </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" size="small">查询</el-button>
              </el-form-item> 
            </el-col> 
            <el-col :span="3" style="text-align:right;">
              <el-form-item>
                <el-upload
                  class="upload-demo" style=""
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :before-upload="beforeAvatarUpload">
                  <el-button size="small" type="primary">导入禁办人员</el-button>
                </el-upload>
              </el-form-item> 
            </el-col>
            <el-col :span="3" style="text-align:right;">
              <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" size="small">下载导入模板</el-button>
              </el-form-item> 
            </el-col>
          </el-row>
        </el-form>
        <el-table border style="width: 100%" align='center'
            :data="tableData">
            <el-table-column
                :prop="fields.certificateCenter.info.prop"
                :label="fields.certificateCenter.info.label"
                :width="fields.certificateCenter.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.name.info.prop"
                :label="fields.name.info.label"
                :width="fields.name.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.type.info.prop"
                :label="fields.type.info.label"
                :width="fields.type.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.cardId.info.prop"
                :label="fields.cardId.info.label"
                :width="fields.cardId.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.status.info.prop"
                :label="fields.status.info.label"
                :width="fields.status.style.width"
                :formatters="formatterStatus">
            </el-table-column>
            <el-table-column
                :prop="fields.importTime.info.prop"
                :label="fields.importTime.info.label"
                :width="fields.importTime.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.forbiddenReason.info.prop"
                :label="fields.forbiddenReason.info.label"
                :width="fields.forbiddenReason.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.revertTime.info.prop"
                :label="fields.revertTime.info.label"
                :width="fields.revertTime.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.revertReason.info.prop"
                :label="fields.revertReason.info.label"
                :width="fields.revertReason.style.width">
            </el-table-column>
            <el-table-column
                :label="fields.operation.info.label"
                :width="fields.operation.style.width">
                <template slot-scope="scope">
                  <el-switch
                    v-model="fields.onOrOff">
                  </el-switch>
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class='btm-action'>
            <el-pagination
                v-if='paginations.total>0'
                class='pagination'
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page='paginations.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'>
            </el-pagination>
        </el-col>
    </div>
</template>

<script>
    import ListJs from './People.js';
    export default ListJs;
</script>
<style scoped lang='less'>
    .demo-form-inline{
        display: inline-block;
        float: right;
    }
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
    .actions-top{
        height: 46px;
    }
    .pagination{
        display: inline-block;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-select {
        width: 100%;
    }
    .sub-title{
      height:20px;
      line-height: 20px;
      font-size: 10px;
      color:#a9afb5;
    }
</style>
