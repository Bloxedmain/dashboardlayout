import axios from 'axios'
export default {
	data() {
      return {
    	/**
    	 * @desc 过滤条件
    	 */
        filterForm: {
          account  : '',
          full_name: '',
          status   :  "0" ,
          user_sequence_encryption :"",
        },
        pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
         
          searchstatus :0,
        
        /**
         * @desc 用户组
         */
        usergroup:[],
        usergroupvalue:[],
        userlist:[],          
        loading:false,
        
        /**
         * @desc table数据
         */
        tableData: [],
        /**
         * @desc dialog数据
         */
        dialogTableVisible: false,
        dialogFormVisible: false,
        userDialogTitle :"添加新用户",
        ruleForm: {
          account:"",
          full_name: '',
          user_validity_due: '',
          phone: '',
          user_mobile: '',
          status :"0",
          user_sequence_encryption: ""
        },
        cacheForm:{
        	account:"",
            full_name: '',
            user_validity_due: '',
            phone: '',
            user_mobile: '',
            status :"0",
            user_sequence_encryption: ""
        },
        rules:{
            account:[
            { required: true, message: '请输入账户名', trigger: 'blur' },
            { message: '长度在 5 到 16 个字符', trigger: 'blur' },
            {
				validator: (rule, value, callback) => {
					if (value === '') {
						callback(new Error('请输入用户名'));
					} else {
						if (/^[a-zA-Z0-9_-]{5,16}$/.test(value)) {
							callback();
						} else {
							callback(new Error('用户名至少5位,由大小写字母和数字,-,_组成'));
						}
					}
				},
				trigger  : 'blur'
			}
        ],
        full_name:[
             { required: true, message: '请输入用户名称', trigger: 'blur' },
             { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
             ],
    user_validity_due:[
             {type:'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
       phone:[
              { required: true, message: '请输入手机号'},
              {
  				validator: (rule, value, callback) => {
  					if (value === '') {
  						callback(new Error('请输入手机号'));
  					} else {
  						if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
  							callback();
  						} else {
  							callback(new Error('请输入正确手机号'));
  						}
  					}
  				},
  				trigger  : 'blur'
  			}
              ],
          user_mobile:[
               { required: true, message: '请输入手机号'},
               {
   				validator: (rule, value, callback) => {
   					if (value === '') {
   						callback(new Error('请输入手机号'));
   					} else {
   						if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
   							callback();
   						} else {
   							callback(new Error('请输入正确手机号'));
   						}
   					}
   				},
   				trigger  : 'blur'
   			}
               ],
    user_sequence_encryption:[
                   { required: true, message: '秘钥不能为空'},
                   {
       				validator: (rule, value, callback) => {
       					if (value === '') {
       						callback(new Error('秘钥不能为空'));
       					} else {
       						if (/[0-9]{9,12}$/.test(value)) {
       							callback();
       						} else {
       							callback(new Error('请输入正确格式秘钥'));
       						}
       					}
       				},
       				trigger  : 'blur'
       			}
                   ]
       
        },
        fileList2:[],
        formLabelWidth: '120px',
        labelPosition: 'top',
        /**
         * @desc 分页数据
         */
        currentPage: 0,
        pageSize : 10 ,
        pageSizes :[10,15,20,25],
        total_count :  0 ,
        
        /**
         * @desc trendsCode 
         */
        codeShow : false
      }
    },
    methods: {
    	/**
    	 * @desc 有效用户列表查询
    	 */
    	getsearchValidusers(){
    		this.$$api_userManage_getsearchValidusers({
        		  urlParams :  {page:this.currentPage || 1 ,rows:this.pageSize  || 10},
      			  headers   :  {'Content-Type': 'application/json;charset=UTF-8'},
      			  fn        :  data => {
      				 this.tableData=data.data;
      				 this.total_count = data.total_count;
      				 this.currentPage  = data.curr_page ;
      			  },
      			  errFn     : (err) => {
      				this.$message.error(err.msg);
      			   },
      			 tokenFlag   : true
      		})
    	},
    	/**
    	 * @desc 添加用户button
    	 */
    	addUserButton(){
    		this.dialogFormVisible = true;
    	},
    	/**
    	 * @desc 添加用户保存按钮
    	 */
    	addUserSure(formData){
    		this.$refs[formData].validate((valid) => {
    	          if (valid) {
    	        	  //this.ruleForm.user_validity_due = (new Date(this.ruleForm.user_validity_due)).toISOString().slice(0,10);
    	        	  if(this.ruleForm.id){
    	        		  this.$$api_userManage_editUserMessage({
  	    	            	data :  this.ruleForm,
  	    	            	headers   :  {'Content-Type': 'application/json;charset=UTF-8'},
  	    	            	fn        : data =>{
  	    	            		if(data.status == 200){
  	    	            			this.$message({
  	    	            				type:"success",
  	    	            				message:"操作成功"
  	    	            			})
  	    	            			this.$refs[formData].resetFields();
  	    	            			this.destroyForm();
  	    	            			this.dialogFormVisible = false;
  	    	            			this.getsearchValidusers();
  	    	            		}
  	    	            	},
  	    	            	errFn     :err =>{
  	    	            		this.$message.error(err.msg);
  	    	            	}
  	    	            }) 
    	        	  }else{
    	        		  this.$$api_userManage_addUserAndProp({
    	    	            	data :  this.ruleForm,
    	    	            	headers   :  {'Content-Type': 'application/json;charset=UTF-8'},
    	    	            	fn        : data =>{
    	    	            		if(data.status == 200){
    	    	            			this.$message({
    	    	            				type:"success",
    	    	            				message:"操作成功"
    	    	            			})
    	    	            			this.$refs[formData].resetFields();
    	    	            			this.destroyForm();
    	    	            			
    	    	            			this.dialogFormVisible = false;
    	    	            			this.getsearchValidusers();
    	    	            		}
    	    	            	},
    	    	            	errFn     :err =>{
    	    	            		this.$message.error(err.msg);
    	    	            	}
    	    	            })  
    	        	  }
    	          } else {
    	            this.$message({
    	            	type    :  "error",
    	            	message :  "验证未通过"
    	            })
    	            return false;
    	          }
    	        });
    	},
    	/**
    	 * @author James
    	 */
    	renderStatus(row, column, cellValue){
    		if(row.deleted==0){
    			return "启用";
    		}else{
    			return "禁用";
    		}
    		
    	},
    	formatValidity(row, column, cellValue){
    		return cellValue.slice(0,10);
    	},
    	/**
    	 * @desc 编辑用户
    	 */
    	editMember(row) {
    		row.user_validity_due = new Date(row.user_validity_due);
            for(var key in this.ruleForm){
            	 this.ruleForm[key]=row[key];
            }
            this.ruleForm.id = row.id;
            this.userDialogTitle = "编辑用户信息";
            this.dialogFormVisible = true;
          },
         /**
          * @desc 编辑用户成员
          */
        handleMember(row){
        	  
          },
        /**
         * @desc 删除用户
         */ 
          deleteUser(row){
        	  this.$confirm("确定删除此用户信息","提示",{
        		  confirmButtonText :'确定',
        		  cancelButtonText  :'取消',
        		  type              :'warnig'
        	  }).then(()=>{
        		  this.$$api_userManage_deleteUser({
        			  urlParams :{userId : row.id},
        			  fn : data=>{
        				  if(data.status==200){
        					  this.$message({
        						  type:'info',
        						  message :'删除成功'
        					  });
        					  this.getsearchValidusers();
        				  }
        			  },
        			  errFn : (err)=>{
        				  this.$message(err.msg);
        			  },
        			  tokenFlag :true
        		  })
        	  }).catch(()=>{
        		this.$message({
        			type             :'info',
        			message          :'已取消删除'
        		})  
        	  })
          },
      /**
       * @desc delete确认
       */
        deleteUserSure(row){
        	  
          },
        /**
         * @desc 用户组过滤
         */
        filterUsergroup(query){
        	this.$$api_userManage_getUserGroup({
        		urlParams : {page:0,rows:50},
        		fn        : data=>{
        			this.usergroup = data.data;
        		},
        		errFn    : err=>{
        			this.$message({
        				type:'warning',
        				message:"异常" 
        			})
        		},
        		tokenFlag: true
        	})
        	if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                  this.loading = false;
                  this.userlist = this.usergroup.filter(item => {
                    return item.group_name.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                  });
                }, 200);
              }else{
            	  this.userlist = [];
              }
        },
        searchUser() {
             this.searchstatus = 1 ;
    		this.$$api_userManage_filterUser({
        		  urlParams :  {page:this.currentPage || 1 ,rows:this.pageSize  || 10},
        		  data      :  this.filterForm,
      			  headers   :  {'Content-Type': 'application/json;charset=UTF-8'},
      			  fn        :  data => {
      				 this.tableData=data.data;
      				 this.total_count = data.total_count;
      				 this.currentPage  = data.curr_page ;
      			  },
      			  errFn     : (err) => {
      				this.$message.error(err.msg);
      			   },
      			 tokenFlag   : true
      		})
    	
      },
      onClean(filterForm){
    	  this.searchstatus = 0 ;
    	  this.filterForm = {
              account  : '',
              full_name: '',
              status   :  "0" ,
              user_sequence_encryption :"",
            },
            this.getsearchValidusers(); 
      },
      /**
       * @desc 分页功能事件
       */
      handleSizeChange(val) {
    	  this.pageSize = val;
    	  if(this.searchstatus == 0){
      		this.getsearchValidusers();
      	}else if(this.searchstatus == 1){
      		this.searchUser();
      	}
        },
        handleCurrentChange(val) {
        	this.currentPage = val;
        	if(this.searchstatus == 0){
        		this.getsearchValidusers();
        	}else if(this.searchstatus == 1){
        		this.searchUser();
        	}
        },
       /**
        * @desc show trendsCode
        */
        codeOver() {
        	this.codeShow = true;
        },
        codeOut() {
        	this.codeShow = false;
        },
        
      /**
       * @desc signature
       */
         handleRemove(file, fileList) {
             console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
          },
     /**
      * @desc 关闭dialog触发
      */
    cleanContent (done){
          
    },
    destroyForm(){
    	for(var key in this.ruleForm){
    		if(key!="status"){
    			this.ruleForm[key] = "";
    		}
    	}
    	delete this.ruleForm.id;
    },
    /**
     * @desc 取消
     */
    cancledialog(formRule){
    	this.destroyForm();
    	this.dialogFormVisible = false;
    }
    },
    mounted() {
       this.getsearchValidusers();
    },
    }