import axios from 'axios'
export default {
	data() {
      return {
    	/**
    	 * @Int 查询条件
        */
        filterForm: {
        	name : "",
        	type_id :""
        },
        /**
         * @int 表格数据
         */
        tableData: [ ],
        /**
         * @int dialog数据
         */
        userRow:"",
        dialogFormVisible: false,
        typeOptions: [{
            value: "1",
            label: '办证中心'
          }, {
            value: "2",
            label: '办证单位'
          }, {
            value: "3",
            label: '监管中心'
          }],
        roleForm: {
          name:"",
          description :"",
          type_id: '',
          
          
        },
        rules:{
        	name:
        	   [{ required: true, message: '角色不能为空', trigger: 'blur'},
        	    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        	    ],
        	    type_id:
             	   [{ required: true,message: '类型不能为空', trigger: 'change'}
             	    ] 
        	},
        formLabelWidth: '60px',
        deleteDialogVisible: false,
        labelPosition: 'top',
        
        /**
         * @int 分页数据
         */
        currentPage: 0,
        pageSizes :[10,20,30,40],
        pageSize : 10  ,
        total_count :  0 ,
      }
    },
    methods: {
    	/**
         * @int 角色列表查询
         */
        getRoles(){
      	  this.$$api_userManage_getsearchrolesbypage({
      		  urlParams :  {page:this.currentPage || 1 ,rows:this.pageSize},
      		  data :  this.filterForm,
      		  
  			  headers   :  {'Content-Type': 'application/json;charset=UTF-8'},
  			  fn        :  data => {
  				 /* var privatetable=[];
  				 for(var key in data.data){
  					privatetable.push({
  						 name:data.data[key].role.name,
  					     description:data.data[key].role.description,
  					     type  : data.data[key].unit.description
  					 })
  				 }*/
  				 this.tableData = data.data;
  				 this.total_count = data.total_count;
  				 this.currentPage  = data.curr_page ;
  			  },
  			  errFn     : (err) => {
  				this.$message.error(err.msg);
  			   },
  			 tokenFlag   : true
  		});
        },
        
    	/**
    	 * @int 添加角色button
    	 */
    	addUserButton(){
    		this.dialogFormVisible = true;
    	},
    	/**
    	 * @int 添加角色保存按钮
    	 */
    	addUserRole(formdata){
    		this.$refs[formdata].validate((valid) => {
    	          if (valid) {
    	        	  if(this.roleForm.id){
    	      			this.$$api_userManage_editUserRole({
    	          			data     : this.roleForm,
    	          		    fn       : data => {
    	          				if(data.status==200){
    	          					this.form.id = "";
    	          			        this.form.group_name = "";
    	          					this.dialogFormVisible = false;
    	          					this.getRoles();
    	          				}
    	          			},
    	          		    errFn   : (err) => {
    	      					this.$message.error(err.msg);
    	      				},
    	      				tokenFlag: true
    	          		})
    	      		}else if(!this.roleForm.id){
    	      			this.$$api_userManage_addroles({
    	          			data     : this.roleForm,
    	          		    fn       : data => {
    	          				if(data.status==200){
    	          					this.$message.success("操作成功");
    	          					this.destoryFrom();
    	          					this.dialogFormVisible = false;
    	          					this.getRoles();
    	          				}
    	          			},
    	          		    errFn   : (err) => {
    	      					this.$message.error(err.msg);
    	      				},
    	      				tokenFlag: true
    	          		})
    	      		}
    	          } else {
    	        	  this.$message.error('验证未通过');
    	              return false;
    	          }
    	        });
    		
    	},
    	renderType(row, column, cellValue){
    		if(row.type_id ==1){
    			return "办证中心";
    		}else if(row.type_id ==2){
    			return "办证机构";
    		}else if(row.type_id ==3){
    			return "监管中心";
    		}else{
    			return "办证中心1";
    		}
    	},
    	/**
    	 * @Int 编辑角色
    	 */
    	editRole(row) {
            this.dialogFormVisible = true;
            row.type_id = String(row.type_id);
            for(var key in this.roleForm){
            	this.roleForm[key] = row[key];
            }
            this.roleForm.id = row.id;
          },
         /**
          * @Int 编辑角色成员
          */
        handleMember(row){
        	  
          },
        /**
         * @int 删除角色
         */ 
          deleteRole(row){
        	  this.$confirm("确定删除此用户信息","提示",{
        		  confirmButtonText :'确定',
        		  cancelButtonText  :'取消',
        		  type              :'warnig'
        	  }).then(()=>{
        		  this.$$api_userManage_deleteUserRole({
        			  urlParams :row.id,
        			  fn : data=>{
        				  if(data.status==200){
        					  this.$message({
        						  type:'info',
        						  message :'删除成功'
        					  });
        					  this.getRoles();
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
         * @title 模糊查询
         */
      onSubmit() {
      	this.getRoles();
      },
      oncleanFilter(){
    	 this.filterForm.name = "";
    	 this.filterForm.type_id = "";
    	 this.getRoles();
      },
      /**
       * @int
       */
      handleSizeChange(val) {
    	  this.pageSize = val ;
    	  this.getRoles();
        },
      handleCurrentChange(val) {
        	this.currentPage = val ;
	        this.getRoles();
	     },
      /**
       * @desc dialog关闭
       */
        cancelEdit(form){
	    	 this.$refs[form].resetFields();
	    	 this.dialogFormVisible = false;
        	
        },
        destoryFrom(){
        	for(var key in this.roleForm){
        		this.roleForm[key]="";
        	}
        }
      
    },
    mounted() {
    	this.getRoles();
    },
    }