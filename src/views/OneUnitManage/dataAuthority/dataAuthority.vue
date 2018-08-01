<template>
	<div>
		<el-table border style="width: 100%" align='center' v-loading="listLoading"
		 :data="tabelData" ref="tabelData" > 
			<el-table-column
				type="index"
				:prop="fields.index.info.prop"
                :label="fields.index.info.label"
                :width="fields.index.style.width">
			</el-table-column>
			<el-table-column
                :prop="fields.userName.info.prop"
                :label="fields.userName.info.label"
                :width="fields.userName.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.procedure.info.prop"
                :label="fields.procedure.info.label"
                :width="fields.procedure.style.width">
                <template slot-scope="scope" >
                	<ul>
						<li v-for = "item in scope.row.procedure" v-text="item.label"></li>
                	</ul>
			     </template>
            </el-table-column>
            <el-table-column
                :prop="fields.organizationScope.info.prop"
                :label="fields.organizationScope.info.label"
                :width="fields.organizationScope.style.width"
                :sortable="fields.organizationScope.info.sortable"
                :formatter="formatterOrganizationScope">
            </el-table-column>
            <el-table-column
                :prop="fields.attachedOrganization.info.prop"
                :label="fields.attachedOrganization.info.label"
                :width="fields.attachedOrganization.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.operation.info.prop"
                :label="fields.operation.info.label">
                <template slot-scope="scope">
                  <el-button  type="text" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
		</el-table>
		 <!-- 编辑dialog -->
        <el-dialog :title="editDialogTitle" :visible.sync="dialogFormVisible" size="small" :modal-append-to-body="false">
          <el-form ref="dialogForm" :model="dialogForm" label-width="120px" :rules="dialogrules">
            <el-form-item label="用户" prop="userName">
              <el-input v-model="dialogForm.userName" size="small" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="可使用流程" prop="procedure">
              <el-select v-model="dialogForm.procedure" filterable multiple placeholder="请选择" size="small" style="width:100%;">
			    <el-option
			      v-for="item in procedureOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
            </el-form-item>
            <el-form-item label="管理组织范围" prop="organizationScope">
            	<el-tree style="height:300px;overflow-x:scroll;"
				  :data="OrgScope"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  highlight-current
				  :props="defaultProps"
				  :default-checked-keys="dialogForm.organizationScope"
				  @check-change="handleCheckChange">
				</el-tree>
            	<!-- <el-select v-model="dialogForm.organizationScope" multiple size="small" style="width:100%;">
            		<el-option 
            		  v-for="item in organizationScopeOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
            		</el-option>
            	</el-select> -->
            </el-form-item>
            <el-form-item label="挂靠组织" prop="attachedOrganization">
            	<el-select v-model="dialogForm.attachedOrganization" size="small" style="width:100%;">
            		<el-option 
            		  v-for="item in attachedOrganization"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
            		</el-option>
            	</el-select>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button type="primary" @click="editSubmit" size="small">保存</el-button>
              <el-button @click="dialogFormVisible = false" size="small">取消</el-button>
            </el-form-item>
          </el-form> 
        </el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible:false,
				listLoading:false,
				tabelData:[
					{ 
						"id":1,
	                    "userName": "姜疆",
	                    "procedure":[
	                   {
	            		value: '1',
						label: '人员长证(三年期)申报'
	            	},
	            	{
	            		value: '2',
						label: '人员短证(一年期)申报'
	            	},
	            	{
	            		value: '3',
						label: '人员长证变更'
	            	},
	            	{
	            		value: '4',
						label: '人员长证注销'
	            	},
	            	{
	            		value: '5',
						label: '人员长证挂失'
	            	},
	            	{
	            		value: '6',
						label: '人员短证申报'
	            	},
	            	{
	            		value: '7',
						label: '人员临证申报'
	            	},
	            	{
	            		value: '8',
						label: '车辆长证申报'
	            	},
	            	{
	            		value: '9',
						label: '车辆短证申报'
	            	},
	            	{
	            		value: '10',
						label: '车辆长证注销'
	            	}],
	                    /*"organizationScope":[{
			              	id:1111,
			              	label:'飞行1部'
			              },{
			              	id:1112,
			              	label:'飞行2部'
			              }],*/
			            "organizationScope":[1111,1112],
	                    "attachedOrganization":"1"
                	},
					{
						"id":2,
	                    "userName": "张宏",
	                    "procedure": [{
		            		value: '1',
							label: '人员长证(三年期)申报'
		            	},
		            	{
		            		value: '2',
							label: '人员短证(一年期)申报'
		            	},
		            	{
		            		value: '3',
							label: '人员长证变更'
		            	}],
	                    "organizationScope":[1112],
	                    "attachedOrganization":"2"
					}
				],
				fields: {
					index:{
						info:{
	                        prop:'',
	                        label:'序号'
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center',
	                        width:'70'
	                    }
					},
	                userName:{
	                    info:{
	                        prop:'userName',
	                        label:'用户',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center',
	                        width:'120'
	                    }
	                },
	                procedure:{
	                    info:{
	                        prop:'procedure',
	                        label:'可使用流程',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center',
	                        width:''
	                    }
	                },
	                organizationScope:{
	                    info:{
	                        prop:'organizationScope',
	                        label:'管理组织范围',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center'
	                    }
	                },
	                attachedOrganization:{
	                    info:{
	                        prop:'attachedOrganization',
	                        label:'挂靠组织',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center',
	                        width:''
	                    }
	                },
	                operation:{
	                    info:{
	                        prop:'opration',
	                        label:'操作',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center',
	                        width:''
	                    }
	                }
	            },
	            editDialogTitle:'正在编辑 数据权限',
	            organizationScopeOptions:[
	            	{
	            		value: '1',
						label: '中国东方航空股份有限公司'
	            	},
	            	{
	            		value: '2',
						label: '上海东方飞机维修公司'
	            	},
	            	{
	            		value: '3',
						label: '综合管理部'
	            	}
	            ],
	            attachedOrganization:[
	            	{
	            		value: '1',
						label: '中国东方航空股份有限公司'
	            	},
	            	{
	            		value: '2',
						label: '上海东方飞机维修公司'
	            	},
	            	{
	            		value: '3',
						label: '综合管理部'
	            	}
	            ],
	            procedureOptions:[
	            	{
	            		value: '1',
						label: '人员长证(三年期)申报'
	            	},
	            	{
	            		value: '2',
						label: '人员短证(一年期)申报'
	            	},
	            	{
	            		value: '3',
						label: '人员长证变更'
	            	},
	            	{
	            		value: '4',
						label: '人员长证注销'
	            	},
	            	{
	            		value: '5',
						label: '人员长证挂失'
	            	},
	            	{
	            		value: '6',
						label: '人员短证申报'
	            	},
	            	{
	            		value: '7',
						label: '人员临证申报'
	            	},
	            	{
	            		value: '8',
						label: '车辆长证申报'
	            	},
	            	{
	            		value: '9',
						label: '车辆短证申报'
	            	},
	            	{
	            		value: '10',
						label: '车辆长证注销'
	            	}
	            ],
	            OrgScope: [{
		          id: 1,
		          label: '上海机场控制区',
		          children: [{
		            id: 11,
		            label: '中国东方航空股份有限公司',
		            children: [{
		              id: 111,
		              label: '上海飞行部',
		              children:[{
		              	id:1111,
		              	label:'飞行1部'
		              },{
		              	id:1112,
		              	label:'飞行2部'
		              }]
		            },{
		            	id:112,
		            	label:'公司领导'
		            },{
		            	id:113,
		            	label:'综合管理部'
		            }, {
		              id: 114,
		              label: '外单位',
		              children:[{
		              	id:1121,
		              	label:'东航传媒'
		              }]
		            }]
		          }]
		        }],
		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        },
	            dialogForm:{
	            	userName:'',
					procedure:[],
					organizationScope:[],
					attachedOrganization:''
	            },
	            dialogrules:{
					unitName: [
						{ required: true, message: '请输入公司名称', trigger: 'blur' }
					]
				},
			}
		},
		methods: {
			setValue(node) {
		        this.$refs.tree.setCheckedKeys(node);
		    },
			//显示编辑界面
			handleEdit: function (index, row) {
				this.dialogFormVisible = true;
				//this.$refs['dialogForm'].resetFields();
				this.editDialogTitle = `正在编辑${row.userName}的数据权限`; 
				this.dialogForm = Object.assign({}, row);//row.organizationScope
				var procedure = row.procedure;
				var arrProcedure =[];
				for (var i in row.procedure){
					arrProcedure.push(row.procedure[i].value);
				}
				this.dialogForm.procedure = arrProcedure;
				//this.dialogForm = row;
				setTimeout(() => {
		          this.setValue(row.organizationScope)
		        }, 0);
			},
			//保存编辑
			editSubmit: function () {
				this.$refs.dialogForm.validate((valid) => {
					if (valid) {
							let para = Object.assign({}, this.dialogForm);
							this.dialogFormVisible = false;
							console.log(para);
							this.$refs['dialogForm'].resetFields();
					}
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			formatterProcedure(item) {
				var showProcedureName=[];
				for(var i=0; i<item.procedure.length ;i++){
					for(var j=0; j<this.procedureOptions.length; j++){
						if(item.procedure[i] == this.procedureOptions[j].value){
							showProcedureName.push(this.procedureOptions[j].label);
						}
					}
				}
				return showProcedureName.join(",");
	        },
	        formatterOrganizationScope(item,column){
	        	var Name = [];
	        	for(var i=0; i<item.organizationScope.length; i++){
	        		Name.push(item.organizationScope[i].label);
	        	}
	        	return Name.join('<br>');
	        },
	        handleCheckChange(data, checked, indeterminate){
	             /*获取所有当前被选中的节点*/
	            var nodes = this.$refs.tree.getCheckedNodes();
	            var keys = this.$refs.tree.getCheckedKeys();
	           console.log(this.$refs.tree.getCheckedNodes());
	           console.log(this.$refs.tree.getCheckedKeys());
	        }
		},
		mounted() {
			
		}
	}

</script>

<style scoped>

</style>