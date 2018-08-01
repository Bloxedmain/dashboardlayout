export default {

	
	data() {
      return {
    	/**
    	 * @Int 查询条件
        */
        formInline: {
        	name : "",
        	creatDate :""
        },
        /**
         * @int 表格数据
         */
        tableData: [],
        formDataStatus:{
        	0 : "有效",
        	1 : "无效"
        },
        /**
         * @int dialog数据
         */
        dialogFormVisible: false,
        form: {
          id  :  "",
          group_name: '',
        },
        rules:{
        	group_name:
        	   [{ required: true, message: '用户组不能为空', trigger: 'blur'},
        	    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        	    ]
        	},
        formLabelWidth: '120px',
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
         * @int 用户组列表查询
         */
        getUserGroup(){
      	  this.$$api_userManage_getUserGroup({
      		  urlParams :  {page:this.currentPage || 1 ,rows:this.pageSize},
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
  		});
        },
        /**
         * @int 重写列
         */
        
    	/**
    	 * @int 添加用户组button
    	 */
    	addUserButton(){
    		this.dialogFormVisible = true;
    	},
    	/**
    	 * @int 添加用户组保存按钮
    	 */
    	addUserGroup(formdata){
    		this.$refs[formdata].validate((valid) => {
    	          if (valid) {
    	        	  if(this.form.id){
    	      			this.$$api_userManage_updateUserGroup({
    	          			data     : {group_name:this.form.group_name,
    	          				        id        : this.form.id},
    	          		    fn       : data => {
    	          				if(data.status==200){
    	          					this.form.id = "";
    	          			        this.form.group_name = "";
    	          					this.dialogFormVisible = false;
    	          					this.getUserGroup();
    	          				}
    	          			},
    	          		    errFn   : (err) => {
    	      					this.$message.error(err.msg);
    	      				},
    	      				tokenFlag: true
    	          		})
    	      		}else if(this.form.id ==""){
    	      			this.$$api_userManage_addUserGroup({
    	          			data     : {group_name:this.form.group_name},
    	          		    fn       : data => {
    	          				if(data.status==200){
    	          					this.form.id = "";
    	          			        this.form.group_name = "";
    	          					this.dialogFormVisible = false;
    	          					this.getUserGroup();
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
    	/**
    	 * @Int 编辑用户组
    	 */
    	handleClick(row) {
            this.dialogFormVisible = true;
            this.form = row;
          },
         /**
          * @Int 编辑用户组成员
          */
        handleMember(row){
        	  
          },
        /**
         * @int 删除用户组
         */ 
          deleteUserGroup(row){
        	this.$confirm('删除用户组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
            	  this.$$api_userManage_deleteUserGroup({
              		urlParams:{id:row.id},
              		fn        :  data => {
           				if(data.status=='200'){
           	                this.$message({
           	                  type: 'success',
           	                  message: '删除成功!'
           	                });
           					this.getUserGroup();
           				}
           			  },
           			  errFn     : (err) => {
           				this.$message.error(err.msg);
           			   },
           			 tokenFlag   : true
              	})
            	
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
        },
        /**
         * @title 模糊查询
         */
      onSubmit() {
        this.$$api_userManage_getByNameUserGroup({
        	urlParams : {name :this.formInline.name},
        	fn        :  data => {
 				 this.tableData=data;
 			  },
 			  errFn     : (err) => {
 				this.$message.error(err.msg);
 			   },
 			 tokenFlag   : true
        })
      },
      onClean(){
    	 this.formInline.name = "";
    	 this.getUserGroup();
      },
      /**
       * @int
       */
      handleSizeChange(val) {
    	  this.pageSize = val ;
    	  this.getUserGroup();
        },
      handleCurrentChange(val) {
        	this.currentPage = val ;
	        this.getUserGroup();
	     }
      
      
    
      
    },
    mounted() {
    	this.getUserGroup();
    },
    
	
}