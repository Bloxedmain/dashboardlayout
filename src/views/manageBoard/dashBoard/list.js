export default {
	
	data() {
      return {
    	  stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
    	  blocks: [
    	    {
    	      id: 1,
    	      status: 'on-hold',
    	      title: 'Test',
    	    },
    	  ],
    	/**
    	 * @Int 查询条件
        */
        boardForm: {
        	name : "test",
        	owner :"admin"
        },
        /**
         * @int 表格数据
         */
        tableData: [
                    {
		        	name:"test",
		        	path:"/dash/dashBoard",
		        	owner:"admin",
		        	property:"私有面板",
                   },{
   		        	name:"test123",
   		        	path:"/dash",
   		        	owner:"admin123",
   		        	property:"共享面板",
                    },{
    		        	name:"test456",
    		        	path:"/dash/",
    		        	owner:"admin456",
    		        	property:"私有面板",
                       }
                 ],
        /**
         * @int dialog数据
         */
         dialogVisible: false,
        dialogForm: {
          title  :  "创建面板",
          name   : '',
          owner  : "",
          description:"",
          property :""
        },
        rules:{
        	name:
        	   [{ required: true, message: '用户组不能为空', trigger: 'blur'},
        	    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        	    ]
        	},
        formLabelWidth: '120px',
        labelPosition: 'top',
        
      }
    },
    methods: {
    	onQuery(){
    		
    	},
    	onClean(){
    		
    	},
    	creatBoard(){
    		this.dialogVisible=true;
    	},
    	handleClose(){
    		
    	},
    	updateBlock(id, status) {
    	      this.blocks.find(b => b.id === Number(id)).status = status;
    	    },
    	routerDash(row, column, cell){
    		if(column.property=="name"){
    			this.$router.push(row.path);
    		}
    	},
    	cancle(dialogForm){
    	this.$refs[dialogForm].resetFields();
    	this.dialogVisible=false;
    	},
    	editBoard(row){
    		this.dialogForm=row;
    		this.dialogForm.title="编辑"+this.dialogForm.name+"面板";
    		this.dialogVisible=true;
    	},
    	deleteBoard(index,table){
    		this.$confirm("确认删除？").then(_=>{
    			table.splice(index,1);
    		}).catch(_=>{
    		this.$message({
    			type:"warning",
    			message:"已取消"
    		})
    		})
    	}
    },
    mounted() {
    	
    },
    
	
}