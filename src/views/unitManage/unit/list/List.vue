<template>
    <div class="list">
        <el-form :label-position="labelPosition" label-width="80px" :model="formData" ref="formData" :inline="true"  class="definedForm">
          <el-form-item label="名称中有" prop="unit_name">
            <el-input v-model="formData.unit_name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="业务类型" prop="business_type" class="definedMargin">
            <el-select v-model="formData.business_type" placeholder="请选择" clearable size="small">
              <el-option  
                v-for="item in typeSelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理员" prop="role_id" class="definedMargin">
            <el-input v-model="formData.role_id" size="small"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="isvalid" class="definedMarginRight">
            <el-select v-model="formData.isvalid"  clearable placeholder="请选择" size="small">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="22">
              <el-form-item>
                <el-button type="primary" @click="searchForm('formData')" size="small">过滤</el-button>
                <el-button @click="resetForm('formData')" size="small">清除筛选</el-button>
              </el-form-item> 
            </el-col> 
            <el-col :span="2" style="padding-left:16px;">
              <el-button  type="primary" icon="edit" @click.native.prevent="addDialogShow" size="small">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table border style="width: 100%" align='center' v-loading="loading2"
    :element-loading-text="loadingText"
            :data="unit_list">
            <!-- <el-table-column v-for="item in items " label="item.label" prop="item.key"></el-table-column> -->
            <el-table-column
              type="index"
              width="70" label="" 
              :prop="fields.id.info.prop"
              :label="fields.id.info.label">
            </el-table-column>
            <el-table-column
                :prop="fields.unitName.info.prop"
                :label="fields.unitName.info.label"
                :width="fields.unitName.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.businessType.info.prop"
                :label="fields.businessType.info.label"
                :sortable="fields.businessType.info.sortable"
                :width="fields.businessType.style.width"
                :formatter="formatterType">
            </el-table-column>
            <el-table-column
                :prop="fields.adminUnit.info.prop"
                :label="fields.adminUnit.info.label">
            </el-table-column>
            <el-table-column
                :prop="fields.isvalid.info.prop"
                :label="fields.isvalid.info.label"
                :width="fields.isvalid.style.width"
                :formatter="formatterStatus">
            </el-table-column>
            <el-table-column
                :prop="fields.operation.info.prop"
                :label="fields.operation.info.label">
                <template slot-scope="scope">
                  <el-button  type="text" size="small" @click.native.prevent="editDialogShow(scope.$index,scope.row)">编辑</el-button>
                  <el-button @click.native.prevent="deleteRow(scope.$index,scope.row)" type="text" size="small">删除</el-button>
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
        <!-- 编辑dialog -->
        <el-dialog title="编辑办证机构" :visible.sync="dialogFormVisible" size="small" :before-close="handleClose">
          <el-form ref="dialogForm" :model="dialogForm" label-width="90px" :rules="dialogrules" class="unit-editdialog">
            <el-form-item label="机构名称" prop="unit_name">
              <el-input v-model="dialogForm.unit_name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="机构描述" prop="description">
              <el-input  :autosize="{ minRows: 1, maxRows: 2}" v-model="dialogForm.description" size="small"></el-input>
            </el-form-item>
            <el-form-item label="机构类型" prop="unit_type">
              <el-select v-model="dialogForm.unit_type" placeholder="请选择" size="small">
                <el-option label="机构类型1" value="1"></el-option>
                <el-option label="机构类型2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务类型" prop="business_type">
              <el-select v-model="dialogForm.business_type" placeholder="请选择" size="small">
               <!--  <el-option label="民航单位" value="1"></el-option>
                <el-option label="联检单位" value="2"></el-option>
                <el-option label="政法系统" value="3"></el-option>
                <el-option label="使领馆" value="4"></el-option> -->
                <el-option  
                  v-for="item in typeSelectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="管辖组织" prop="admin_unit">
              <el-input v-model="dialogForm.admin_unit" size="small"></el-input>
              <div class="sub-title">选择本机构管辖的组织</div>
            </el-form-item>
            <el-form-item label="业务授权" prop="business_authorization">
              <el-input type="textarea" v-model="dialogForm.business_authorization"></el-input>
            </el-form-item>
            <el-form-item label="上级机构" prop="superior_unit">
              <el-select v-model="dialogForm.superior_unit" placeholder="办证机构列表" size="small">
                <el-option label="上级机构1" value="1"></el-option>
                <el-option label="上级机构2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签" prop="unit_label">
                <el-select v-model="dialogForm.unit_label"  placeholder="请选择">
                  <el-option label="外网办证单位1" value="1"></el-option>
                  <el-option label="外网办证单位2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="制证简称" prop="card_abbreviation">
              <el-input v-model="dialogForm.card_abbreviation" size="small"></el-input>
              <div class="sub-title">用于显示当前办证机构通行证卡片上的单位简称</div>
            </el-form-item>
            <el-form-item label="状态" prop="isvalid">
              <el-switch  
                v-model="dialogForm.isvalid"
                on-text="启用"
                off-text="禁用"
                :on-value="OnValue"
                :off-value="OffValue">
              </el-switch>
            </el-form-item>
            <el-form-item label="目标服务器" prop="destination_server">
              <el-input v-model="dialogForm.destination_server" size="small"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button type="primary" @click="editSure('dialogForm')" size="small">保存</el-button>
              <el-button @click="dialogFormVisible = false" size="small">取消</el-button>
            </el-form-item>
          </el-form> 
        </el-dialog>
    </div>
</template>

<script>
    import ListJs from './List.js';
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
    .definedForm .el-form-item {
      margin-bottom: 10px;
      width: 23%;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .unit-editdialog .el-form-item {
      margin-bottom: 20px;
    }
    .definedMargin{
      margin: 0 10px 10px 10px;
    }
    .definedMarginRight{
      margin: 0 0 10px 10px;
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
