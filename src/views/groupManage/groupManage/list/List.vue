<template>
    <div class="list">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">组织架构管理</span>
          <el-button style="float: right;margin-left:20px;" type="text" @click="recordDialogVisible = true">显示发布记录</el-button>
          <el-button style="float: right;" type="text" @click="showIsUnit" v-show="showCertificateUnit">显示办证机构</el-button>
          <el-button style="float: right;" type="text" @click="showIsUnit" v-show="!showCertificateUnit">隐藏办证机构</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="7">
              <el-tree 
                :data="treedata" 
                :props="defaultProps" 
                :load="loadNode"
                node-key="id"
                check-strictly
                :default-expanded-keys="expandedkeys"
                :current-node-key="curNodeKeys"
                highlight-current
                :render-content="renderContent"
                @node-click="handleNodeClick">
              </el-tree>
          </el-col>
          <el-col :span="17">
            <div v-if="infoRadio==1">
              <el-row>
                <el-card class="box-card form-title">
                  <div slot="header" class="clearfix" >
                    <span style="line-height: 36px;">基本信息</span>
                    <div style="line-height: 36px;float: right;">
                      <span class="el-radio__label">类型：</span>
                      <template>
                        <!-- <el-radio class="radio" v-model="infoRadio" label="1">单位</el-radio>
                        <el-radio class="radio" v-model="infoRadio" label="2">部门</el-radio> -->
                        <el-radio-group v-model="infoRadio" @change="RadioChange">
                          <el-radio label="1">单位</el-radio>
                          <el-radio label="2">部门</el-radio>
                        </el-radio-group>
                      </template>
                    </div>
                  </div>
                  <div >
                      <el-row :gutter="20">
                        <el-form ref="formInfo" :model="formInfo" label-width="120px" size="small" :rules="formInfoRules">
                          <el-col :span="12">
                            <el-form-item label="中文名称" prop="cn_name">
                              <el-input v-model="formInfo.cn_name" size="small"></el-input>

                            </el-form-item>
                            <el-form-item label="上级单位" >
                              <span v-text="SuperUnit"></span>
                              <el-button type="text"  @click="SuperUnitDialogVisible = true">选择上级</el-button>
                              <!-- <el-input v-model="formInfo.chinesename" size="small"></el-input> -->
                            </el-form-item>
                            <el-form-item label="法人代表" prop="legal_representative">
                              <el-input v-model="formInfo.legal_representative" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="注册地址" prop="registration_addr">
                              <el-input v-model="formInfo.registration_addr" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="营业地址" prop="business_addr">
                              <el-input v-model="formInfo.business_addr" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="组织机构编码" prop="pass_unit_code">
                              <el-input v-model="formInfo.pass_unit_code" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="批准证书" prop="approval_certificate">
                              <el-input v-model="formInfo.approval_certificate" size="small"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="英文名称" prop="eng_name">
                              <el-input v-model="formInfo.eng_name" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="业务类型" prop="business_type">
                              <el-select v-model="formInfo.business_type" placeholder="请选择" size="small" style="width:100%;" clearable >
                                <el-option
                                  v-for="item in business_type_options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="制证简码" prop="pass_abbreviation">
                              <el-input v-model="formInfo.pass_abbreviation" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="注册日期" prop="registration_date">
                              <el-date-picker size="small" style="width:100%;"
                                v-model="formInfo.registration_date"
                                type="date"
                                placeholder="选择日期" >
                              </el-date-picker>
                            </el-form-item>
                            <el-form-item label="营业到期日" prop="business_expire_date">
                              <el-date-picker size="small" style="width:100%;"
                                v-model="formInfo.business_expire_date"
                                type="date"
                                placeholder="选择日期" >
                              </el-date-picker>
                            </el-form-item>
                            <el-form-item label="邮政编码" prop="postcode">
                              <el-input v-model="formInfo.postcode" size="small"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-form>
                      </el-row>
                  </div>
                </el-card>
              </el-row>
              <el-row>
                <el-card class="box-card form-title card-form">
                  <div slot="header" class="clearfix" >
                    <span style="line-height: 36px;">联系方式</span>
                  </div>
                  <div >
                     <el-row :gutter="20">
                        <el-form ref="formContact" :model="formContact" label-width="120px" size="small">
                          <el-col :span="12">
                            <el-form-item label="单位电话">
                              <el-input v-model="formContact.phone_number" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人姓名">
                              <el-input v-model="formContact.contact_person" size="small"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="单位传真">
                              <el-input v-model="formContact.fax_number" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人电话">
                              <el-input v-model="formContact.contact_phone" size="small"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-form>
                      </el-row>
                  </div>
                </el-card>
              </el-row>
              <el-row>
                <el-card class="box-card form-title form-body">
                  <div slot="header" class="clearfix" >
                    <span style="line-height: 36px;">附件材料</span>
                    <el-button style="float: right;margin-top: 4px;" :plain="true" type="info" size="small" @click="dialogVisible = true">上传附件</el-button>
                  </div>
                  <div >
                    <el-table :data="tableData" style="width: 100%;" border >
                      <el-table-column 
                                :prop="fields.filename.info.prop"
                                :label="fields.filename.info.label"
                                :header-align="fields.enddate.style.headerAlign">
                      </el-table-column>
                      <el-table-column 
                                :prop="fields.idCard.info.prop"
                                :label="fields.idCard.info.label"
                                :header-align="fields.idCard.style.headerAlign">
                      </el-table-column>
                      <el-table-column 
                                :prop="fields.size.info.prop"
                                :label="fields.size.info.label" 
                                width="100"
                                :header-align="fields.size.style.headerAlign">
                      </el-table-column>
                      <el-table-column 
                                :prop="fields.enddate.info.prop"
                                :label="fields.enddate.info.label" 
                                :width="fields.enddate.style.width"
                                :header-align="fields.enddate.style.headerAlign">
                      </el-table-column>
                      <el-table-column label="操作" >
                        <template slot-scope="scope">
                          <el-button type="text" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </el-row>
            </div>
            <div v-else>
              <el-row>
                <el-card class="box-card form-title">
                  <div slot="header" class="clearfix" >
                    <span style="line-height: 36px;">基本信息</span>
                    <div style="line-height: 36px;float: right;">
                      <span class="el-radio__label">类型：</span>
                      <template>
                        <!-- <el-radio class="radio" v-model="infoRadio" label="1">单位</el-radio>
                        <el-radio class="radio" v-model="infoRadio" label="2">部门</el-radio> -->
                        <el-radio-group v-model="infoRadio" @change="RadioChange">
                          <el-radio label="1">单位</el-radio>
                          <el-radio label="2">部门</el-radio>
                        </el-radio-group>
                      </template>
                    </div>
                  </div>
                  <div >
                      <el-row :gutter="20">
                        <el-form ref="formInfo" :model="formInfo" label-width="120px" size="small">
                          <el-col :span="12">
                            <el-form-item label="中文名称">
                              <el-input v-model="formInfo.cn_name" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="上级单位">
                              <!-- <el-input v-model="formInfo.chinesename" size="small"></el-input> -->
                              <span v-text="SuperUnit"></span>
                              <el-button type="text"  @click="SuperUnitDialogVisible = true">选择上级</el-button>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="英文名称">
                              <el-input v-model="formInfo.eng_name" size="small"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-form>
                      </el-row>
                  </div>
                </el-card>
              </el-row>
              <el-row>
                <el-card class="box-card form-title card-form" >
                  <div slot="header" class="clearfix" >
                    <span style="line-height: 36px;">联系方式</span>
                  </div>
                  <div >
                     <el-row :gutter="20">
                        <el-form ref="formContact" :model="formContact" label-width="120px" size="small">
                          <el-col :span="12">
                            <el-form-item label="单位电话">
                              <el-input v-model="formContact.phone_number" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人姓名">
                              <el-input v-model="formContact.contact_person" size="small"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="单位传真">
                              <el-input v-model="formContact.fax_number" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人电话">
                              <el-input v-model="formContact.contact_phone" size="small"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-form>
                      </el-row>
                  </div>
                </el-card>
              </el-row>
            </div>
            <el-row style="text-align:center;margin-top:20px;">
              <el-button type="primary" @click="tempSave">暂存</el-button>
              <el-button @click="SaveCancell">取 消</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-dialog
        title="上传材料"
        :visible.sync="dialogVisible"
        size="tiny">
        <el-form :model="uploadForm" :rules="uploadFormRules" ref="uploadForm" label-width="100px">
          <el-form-item label="附件" prop="">
            <el-col :span="20">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip" v-show="false">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item label="材料类型" prop="idCard">
            <el-col :span="20">
              <el-select v-model="uploadForm.idCard" placeholder="请选择" style="width:100%;">
                <el-option label="营业执照" value="shanghai"></el-option>
                <el-option label="组织机构证" value="beijing"></el-option>
                <el-option label="其他" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="有效截止期" prop="enddate">
            <el-col :span="20">
              <el-date-picker style="width:100%;" type="date" placeholder="选择日期" v-model="uploadForm.enddate" ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="submitForm('uploadForm')">保存</el-button>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="recordDialogVisible"
        size="tiny">
        <el-table :data="recordTableData" style="width: 100%;" border >
          <el-table-column 
                    :prop="recordTableCol.time"
                    label="日期"
                    header-align="center">
          </el-table-column>
          <el-table-column 
                    :prop="recordTableCol.info"
                    label="消息"
                    header-align="center">
          </el-table-column>
        </el-table>
     </el-dialog>
     <el-dialog
        :visible.sync="SuperUnitDialogVisible"
        size="tiny" 
        title="选择上级部门">
        <el-tree 
          :data="treedata" 
          :props="defaultProps" 
          node-key="label"
          @node-click="handleNodeClickSuperUnit"  
          highlight-current
          :default-expanded-keys="['中国东方航空股份有限公司']"
          check-strictly>
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectSuperUnitSure">确 定</el-button>
          <el-button @click="SuperUnitDialogVisible = false">取 消</el-button>
        </span>
     </el-dialog>
    </div>
</template>

<script>
    import ListJs from './List.js';
    export default ListJs;
</script>
<style scss>
/*<i class="fa fa-home"></i>*/
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background-color: #edf7ff;
        color:#0d87f7;
        font-weight: 700;
    }
    .el-card__header {
        padding: 3px 20px;
        border-bottom: 1px solid #d1dbe5;
        box-sizing: border-box;
        background-color: #ececec;
    }
    .form-title .el-card__header {
        padding: 0 20px;
    }
    .card-form{
      margin:12px 0;
    }
    .form-body .el-card__body{
      padding: 0;
    }
    .el-row {
      margin-bottom: 0;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-form-item {
        margin-bottom: 12px;
    }
    .el-tree-node__content{
      position: relative;
    }
</style>
