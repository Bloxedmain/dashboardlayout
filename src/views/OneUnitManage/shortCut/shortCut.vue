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
                :prop="fields.unitname.info.prop"
                :label="fields.unitname.info.label"
                :width="fields.unitname.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.address.info.prop"
                :label="fields.address.info.label"
                :width="fields.address.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.OrderNo.info.prop"
                :label="fields.OrderNo.info.label"
                :width="fields.OrderNo.style.width"
                :sortable="fields.OrderNo.info.sortable">
            </el-table-column>
            <el-table-column
                :prop="fields.operation.info.prop"
                :label="fields.operation.info.label">
                <template slot-scope="scope">
                  <el-button  type="text" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button @click.native.prevent="handleDel(scope.$index,scope.row)" type="text" >删除</el-button>
                </template>
            </el-table-column>
		</el-table>
		 <!-- 编辑dialog -->
        <el-dialog title="编辑快捷方式" :visible.sync="dialogFormVisible" size="tiny" :modal-append-to-body ="false">
          <el-form ref="dialogForm" :model="dialogForm" label-width="90px" :rules="dialogrules">
            <el-form-item label="名称" prop="unitName">
              <el-input v-model="dialogForm.unitName" size="small"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="address">
              <el-input v-model="dialogForm.address" size="small"></el-input>
            </el-form-item>
            <el-form-item label="排序号码" prop="OrderNo">
            	<el-input v-model="dialogForm.OrderNo" size="small"></el-input>
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
	                    "unitName": "公司OA",
	                    "address": "http://xxx.yyy.ocm",
	                    "OrderNo": "1"
                	},
					{
						"id":2,
	                    "unitName": "公司邮箱",
	                    "address": "http://mail.yyy.com",
	                    "OrderNo": "2"
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
	                        width:'80'
	                    }
					},
	                unitname:{
	                    info:{
	                        prop:'unitName',
	                        label:'名称',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center',
	                        width:''
	                    }
	                },
	                address:{
	                    info:{
	                        prop:'address',
	                        label:'链接地址',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center'
	                    }
	                },
	                OrderNo:{
	                    info:{
	                        prop:'OrderNo',
	                        label:'排序号码',
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
	            dialogForm:{},
	            dialogrules:{
					unitName: [
						{ required: true, message: '请输入公司名称', trigger: 'blur' }
					]
				},
			}
		},
		methods: {
			//显示编辑界面
			handleEdit: function (index, row) {
				this.dialogFormVisible = true;
				this.dialogForm = Object.assign({}, row);
			},
			//保存编辑
			editSubmit: function () {
				this.$refs.dialogForm.validate((valid) => {
					if (valid) {
							let para = Object.assign({}, this.dialogForm);
							this.dialogFormVisible = false;
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
			}
		},
		mounted() {
			
		}
	}

</script>

<style scoped>

</style>