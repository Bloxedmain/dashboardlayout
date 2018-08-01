import axios from 'axios'
export default {
    name: 'order-list',
    data() {
        return {
            tableData: [],//table数据
            //需要给分页组件传的信息
            paginations: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
            format_status_list: {//状态列
                true: '启用',
                false: '禁用'
            },
            fields: {
                id:{
                    info:{
                        prop:'id',
                        label:''
                    }
                },
                certificateCenter:{
                    info:{
                        prop:'certificateCenter',
                        label:'办证中心'
                    },
                    filter:{

                    },
                    style:{
                        align: 'center',
                        width:'100'
                    }
                },
                name:{
                    info:{
                        prop:'name',
                        label:'姓名',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        align: 'center',
                        width:'80'
                    }
                },
                type:{
                    info:{
                        prop:'type',
                        label:'证件类型',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '100',
                        align: 'center'
                    }
                },
                cardId:{
                    info:{
                        prop:'cardId',
                        label:'证件号',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '',
                        align: 'center'
                    }
                },
                status:{
                    info:{
                        prop:'status',
                        label:'状态',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '70',
                        align: 'center'
                    }
                },
                importTime:{
                    info:{
                        prop:'importTime',
                        label:'导入时间',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '115',
                        align: 'center'
                    }
                },
                forbiddenReason:{
                    info:{
                        prop:'forbiddenReason',
                        label:'禁办原因',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '',
                        align: 'center'
                    }
                },
                revertTime:{
                    info:{
                        prop:'revertTime',
                        label:'恢复时间',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '115',
                        align: 'center'
                    }
                },
                revertReason:{
                    info:{
                        prop:'revertReason',
                        label:'恢复原因',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '',
                        align: 'center'
                    }
                },
                onOrOff:false,
                operation:{
                    info:{
                        prop:'',
                        label:'操作',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '',
                        align: 'center'
                    }
                }
            },
            labelPosition: 'top',
            formData: {
              name: '',
              cardId:'',
              status:'',
              importTime:'',
              pickerOptions2: {
                  shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近三个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                    }
                  }]
              }
              
            },

            formLabelWidth: '100px'
        }
    },

    methods: {
        /**
         * 格式化状态
         */
        formatterStatus(item) {
            return this.format_status_list[item.status];
        },
        formatterType(item) {
            return this.format_type_list[item.businessType];
        },
        /**
         * 改变页码和当前页时需要拼装的路径方法
         * @param {string} field 参数字段名
         * @param {string} value 参数字段值
         */
        setPath(field, value) {
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
        },
        /**
         * 改变当前页事件
         * @param  {number} page 当前页码
         */
        onChangeCurrentPage(page) {
            this.getList({
                page,
                fn: () => {
                    this.setPath('page', page);
                }
            });
        },
        /**
         * 改变每页显示数量事件
         * @param  {number} size 当前每页显示数量
         */
        onChangePageSize(page_size) {
            this.getList({
                page_size,
                fn: () => {
                    this.setPath('page_size', page_size);
                }
            });
        },
        /**
         * 获取订单列表
         * @param  {number} options.page      当前页码，切换页码时用
         * @param  {number} options.page_size 每页显示数量，改变每页数量时用
         * @param  {function} options.fn                            } 获取列表后的回调函数
         */
        getList({
            page,
            page_size,
            where,
            fn
        } = {}) {
            var query = this.$route.query;
            this.paginations.current_page = page || parseInt(query.page) || 1;
            this.paginations.page_size = page_size || parseInt(query.page_size) || this.paginations.page_size;

            var data = {
                page: this.paginations.current_page,
                page_size: this.paginations.page_size
            };

            if (where) {
                data = Object.assign(data, where || {});
            }
            /*this.$$api_order_selectOrder2({
                data,
                fn:article_data=>{
                    console.log(article_data);
                    this.article_list = article_data.list.data;
                    this.paginations.total = article_data.list.total;
                    fn && fn();
                }
            });*/
            var _this=this;
              axios({
                method: 'get',
                url: '/static/forbiddenPeople.json',
                params: {
                  pageSize: '1'
                }
              }).then(function (response) {
                console.log(response);
                _this.tableData = response.data.data.list.data;
                _this.paginations.total = response.data.data.list.total;
              }).catch(function (error) {
                alert(error);
              });
			
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                console.log(this.formData);
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        editDialogShow(index,rows){//编辑框赋值
            this.dialogFormVisible = true;
            this.dialogForm.id = rows[index].id;
            this.dialogForm.unitName = rows[index].unitName;
            this.dialogForm.description = rows[index].description;
            this.dialogForm.unitType = rows[index].unitType;
            this.dialogForm.businessType = rows[index].businessType;
            this.dialogForm.node = rows[index].node;
            this.dialogForm.businessAuthor = rows[index].businessAuthor;
            this.dialogForm.parentUnit = rows[index].parentUnit;
            this.dialogForm.forShort = rows[index].forShort;
            this.dialogForm.status = rows[index].status;
            this.dialogForm.desServer = rows[index].desServer;
            console.log(rows[index].tags);
            //this.dialogForm.tags = rows[index].tags;
        },
        addDialogShow(){
            //打开前清空表单
            this.dialogFormVisible = true;
        },
        editSure(formName){
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
            console.log(this.dialogForm);
            if(this.dialogForm.id){
                alert("发送编辑请求");
            }else {
                alert("发送新增请求");
            }
            //发送编辑请求
        },
        deleteRow(index,rows){
            this.$confirm('确认删除？')
              .then(_ => {
                    rows.splice(index, 1);
                    console.log(rows[index].id);
                    //发送删除请求
              })
              .catch(_ => {});
        },
        beforeAvatarUpload(file) {
            //格式只能为2007版本的表格
            const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isXlsx) {
              this.$message.error('只能上传以.xlsx结尾的excel表格!');
            }
            if (!isLt2M) {
              this.$message.error('上传文件大小不能超过 2MB!');
            }
            return isXlsx && isLt2M;
        }
    },
    mounted() {
        this.getList({
            fn: () => {
                // this.onSelectArticle(this.article_list[1]);
            }
        });
    },
    '$route' (to, from) {
    }
}