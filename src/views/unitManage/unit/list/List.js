import axios from 'axios'
export default {
    name: 'order-list',
    data() {
        return {
            loading2:false,
            'loadingText':'保存中',
            unit_list: [],//table数据
            format_status_list: {//状态列
                1: '启用',
                0: '禁用'
            },
            format_type_list: {//业务类型列
                1: '民航单位',
                2: '联检单位',
                3: '政法系统',
                4: '使领馆',
                5:'办证中心',
                6:'监管中心'
            },
            typeSelectOptions:[
                {value:1,label:'民航单位'},
                {value:2,label:'联检单位'},
                {value:3,label:'政法系统'},
                {value:4,label:'使领馆'},
                {value:5,label:'办证中心'},
                {value:6,label:'监管中心'}
            ],
            //需要给分页组件传的信息
            paginations: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
            //表格table字段
            fields: {
                id:{
                    info:{
                        prop:'id',
                        label:'序号'
                    }
                },
                unitName:{
                    info:{
                        prop:'unit_name',
                        label:'名称',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        align: 'center'
                    }
                },
                businessType:{
                    info:{
                        prop:'business_type',
                        label:'业务类型',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '120',
                        align: 'center'
                    }
                },
                adminUnit:{
                    info:{
                        prop:'admin_unit',
                        label:'管辖组织节点',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        align: 'center'
                    }
                },
                isvalid:{
                    info:{
                        prop:'isvalid',
                        label:'状态',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '90',
                        align: 'center'
                    }
                },
                operation:{
                    info:{
                        prop:'opration',
                        label:'操作'
                    },
                    filter:{

                    },
                    style:{
                        align: 'center',
                        width:''
                    }
                }
            },
            labelPosition: 'top',
            formData: {
              unit_name: '',
              business_type: '',
              role_id: '',
              isvalid:''
            },
            dialogrules:{
              unit_name:  [{
                required: true, message: '请输入机构名称', trigger: 'blur'
              }],
              admin_unit:[{
                required: true, message: '请输入管辖组织', trigger: 'blur'
              }],
              card_abbreviation:[{
                required: true, message: '请输入制证简称', trigger: 'blur'
              }]
            },
            dialogFormVisible: false,
            dialogForm:{
                id:'',
                unit_name:'',
                description:'',
                unit_type:'',
                business_type:'',
                admin_unit:'',
                business_authorization:'',
                superior_unit:'',
                card_abbreviation:'',
                isvalid:1,
                destination_server:'',
                unit_label:''
            },
            OnValue:1,
            OffValue:0,
            formLabelWidth: '100px'
        }
    },

    methods: {
        /**
         * 格式化状态
         */
        formatterStatus(item) {
            return this.format_status_list[item.isvalid];
        },
        formatterType(item) {
            return this.format_type_list[item.business_type];
        },
        /**
         * 改变页码和当前页时需要拼装的路径方法
         * @param {string} field 参数字段名
         * @param {string} value 参数字段值
         */
        /*setPath(field, value) {
            var path = this.$route.path,
                query = Object.assign({}, this.$route.query);
            if (typeof field === 'object') {
                query = field;
            } else {
                query[field] = value;
            }
            this.$router.push({
                path,
                query
            });
        },*/
        /**
         * 改变当前页事件
         * @param  {number} page 当前页码
         */
        /*onChangeCurrentPage(page) {
            this.getUnitList({
                page,
                fn: () => {
                    this.setPath('page', page);
                }
            });
        },*/
        /**
         * 改变每页显示数量事件
         * @param  {number} size 当前每页显示数量
         */
        /*onChangePageSize(page_size) {
            this.getUnitList({
                page_size,
                fn: () => {
                    this.setPath('page_size', page_size);
                }
            });
        },*/
        /**
         * 获取机构列表
         */
        getUnitList(){
            this.loading2 = true;
            this.loadingText = '查询中，请稍候';
            this.$$api_unitManage_findallunit({
              fn        :  data => {
                 this.unit_list = data.data;
                 this.loading2 = false;
                 this.loadingText = '保存中';
              },
              errFn     : (err) => {
                this.$message.error(err.msg);
               },
              tokenFlag   : true
            });
        },
        searchForm(formName){
                this.loading2 = true;
                this.loadingText = '查询中，请稍候';
                this.$$api_unitManage_filterActiveUnits({
                    data :this.formData,
                    urlParams:{page:1,rows:1000},
                    fn:data=>{
                        this.loading2 = false;
                        this.loadingText = '保存中';
                        this.unit_list = data.data;
                    }
                });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getUnitList();
        },
        editDialogShow(index,row){
            this.dialogFormVisible = true;
            //编辑框赋值,只给必要的字段赋值
            for(var key_dialogform in this.dialogForm){
                for(var key_row in row){
                    if(key_dialogform == key_row){
                        this.dialogForm[key_dialogform] = row[key_row];
                    }
                }
            }
        },
        addDialogShow(){
            this.dialogFormVisible = true;
            this.dialogForm = {  //清空表单。不能这样写  this.dialogForm ={} 也不能这样:document.getElementsByClassName("unit-editdialog")[0].reset();
                id:'',
                unit_name:'',
                description:'',
                unit_type:'',
                business_type:'',
                admin_unit:'',
                business_authorization:'',
                superior_unit:'',
                card_abbreviation:'',
                isvalid:1,
                destination_server:'',
                unit_label:''
            };
        },
        editSure(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading2 = true;
                    this.dialogFormVisible = false;
                    if(this.dialogForm.id){//编辑
                        this.$$api_unitManage_UnitEdit({
                            path : '/pass/org/units/'+this.dialogForm.id,
                            data :this.dialogForm,
                            fn:data=>{
                                this.loading2 = false;
                                this.$message.success("编辑机构成功！");
                                this.getUnitList();
                            }
                        });
                    }else {    //新增
                        this.$$api_unitManage_addUnitAndProp({
                          data:this.dialogForm,
                          headers :{'Content-Type': 'application/json'},
                          fn        :  data => {
                            this.loading2 = false;
                            this.$message.success("新增机构成功！");
                            this.getUnitList();
                          },
                          errFn     : (err) => {
                            this.$message.error(err.msg);
                           }
                        });
                    }
                }
            })
        },
        deleteRow(index,row){
            this.$confirm('确定要删除该机构('+row.unit_name+')吗？')
              .then(_ => {
                    this.$$api_unitManage_delete({
                      path : '/pass/org/units/delete/{id}?id='+row.id,
                      headers :{'Content-Type': 'application/json'},
                      fn        :  data => {
                        this.dialogFormVisible = false;
                        this.getUnitList();
                      },
                      errFn     : (err) => {
                        this.$message.error(err.msg);
                       }
                    });
                    //发送删除请求
              })
              .catch(_ => {});
        },
        handleClose(done) {
            //this.$refs['dialogForm'].resetFields();//注意清空和重置的区别
            done();
        }
    },
    mounted() {
        this.getUnitList();
        /*axios.get('/api/org/units/findallunit', {})
             .then(function (response) {
             })
             .catch(function (error) {
             });*/
    },
    '$route' (to, from) {
    }
}