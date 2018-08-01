<template>
	<section>
		<el-table :data="rolesData" style="width: 100%;" border>
			<el-table-column 
				:prop="fields.role.info.prop"
                :label="fields.role.info.label">
			</el-table-column>
			<el-table-column 
				:prop="fields.users.info.prop"
                :label="fields.users.info.label"
                :formatter="formatterUsers">
			</el-table-column>
			<el-table-column 
				:prop="fields.userGroup.info.prop"
                :label="fields.userGroup.info.label" 
				width="100">
			</el-table-column>
			<el-table-column label="操作" >
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--编辑界面-->
		<!-- <el-dialog :title="editDialogTitle" :visible.sync="editFormVisible" size="tiny" :modal-append-to-body="false"> -->
		<el-dialog :title="editDialogTitle" 
			 :visible.sync="editFormVisible"
			 :close-on-click-modal="true" 
			 :modal-append-to-body ="false"
			size="small">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" >
				<el-form-item label="角色" prop="role">
					<el-input v-model="editForm.role"  :disabled="true" size="small"></el-input>
				</el-form-item>
				<el-form-item label="用户" prop="users">
					  <el-select v-model="editForm.users" multiple size="small" style="width:100%;">
					    <el-option
					      v-for="item in usersOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="用户组" prop="userGroup">
					  <el-select v-model="editForm.userGroup" multiple size="small" style="width:100%;">
					    <el-option
					      v-for="item in userGroupOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				rolesData:[
					{ 
						"id":1,
	                    "role": "局领导",
	                    "users":["选项2","选项3"] ,
	                    "userGroup": ""
                	},
					{
						"id":2,
	                    "role": "长证处领导",
	                    "users": ["选项4"],
	                    "userGroup": ""
					}
				],
				fields: {
	                role:{
	                    info:{
	                        prop:'role',
	                        label:'角色'
	                    },
	                    style:{
	                        width: ''
	                    }
	                },
	                users:{
	                    info:{
	                        prop:'users',
	                        label:'用户',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        align: 'center'
	                    }
	                },
	                userGroup:{
	                    info:{
	                        prop:'userGroup',
	                        label:'用户组',
	                        sortable: true
	                    },
	                    filter:{

	                    },
	                    style:{
	                        width: '120',
	                        align: 'center'
	                    }
	                }
	            },
				listLoading: false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					role: [
						{ required: true, message: '请输入角色', trigger: 'blur' }
						
					],
					users:[
						{ required: true, message: '请输入用户', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: '',
					role: '',
					users: '',
					userGroup: ''
				},
				editDialogTitle:'正在为  分配用户组信息',	
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				usersOptions: [{
		          value: '选项1',
		          label: '刘国庆'
		        }, {
		          value: '选项2',
		          label: '秦重翰'
		        }, {
		          value: '选项3',
		          label: '胡国利'
		        }, {
		          value: '选项4',
		          label: '郭彦民'
		        }, {
		          value: '选项5',
		          label: '盛黎华'
		        }],
		        userGroupOptions: [{
		          value: '选项1',
		          label: '系统管理员'
		        }, {
		          value: '选项2',
		          label: '系统管理员'
		        }, {
		          value: '选项3',
		          label: '系统管理员'
		        }, {
		          value: '选项4',
		          label: '系统管理员'
		        }, {
		          value: '选项5',
		          label: '系统管理员'
		        }]

			}
		},
		methods: {
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				//this.listLoading = true;
				//NProgress.start();
				/*getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});*/
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editDialogTitle = `正在为${row.users}分配用户组信息`; 
				this.editForm = Object.assign({}, row);
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {})
						.then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							console.log(this.editForm);
							
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
						}).catch(() => {

						});
					}
				});
			},
			formatterUsers:function(item){
				var usersArr = [];
				for(var i=0; i<this.usersOptions.length; i++){
					for(var j=0; j<item.users.length; j++){
						if(item.users[j] == this.usersOptions[i].value){
							 usersArr.push(this.usersOptions[i].label);
							console.log(this.usersOptions[i].label);
						}
					}
				}
				return usersArr.join("; ");
			}
		},
		mounted() {
			//this.getUsers();
		}
	}

</script>

<style scoped>

</style>