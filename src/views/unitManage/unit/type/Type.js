import axios from 'axios'
export default {
    name: 'unit-type',
    data() {
        return {
            tabelData: [],//table数据
            //需要给分页组件传的信息
            paginations: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
            fields: {
                id:{
                    info:{
                        prop:'id',
                        label:'序号'
                    },
                    style:{
                        align: 'center',
                        width:'80'
                    }
                },
                code:{
                    info:{
                        prop:'code',
                        label:'编码',
                        sortable: true
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
                        label:'名称',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '120',
                        align: 'center'
                    }
                },
                sortNum:{
                    info:{
                        prop:'sortNum',
                        label:'排序号',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        align: 'center',
                        width:'100'
                    }
                },
                remark:{
                    info:{
                        prop:'remark',
                        label:'备注'
                    },
                    filter:{

                    },
                    style:{
                        align: 'center'
                    }
                }
            }
        }
    },

    methods: {
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
                url: '/static/type.json',
                params: {
                  pageSize: '1'
                }
              }).then(function (response) {
                console.log(response);
                _this.tabelData = response.data.data.list.data;
                _this.paginations.total = response.data.data.list.total;
              }).catch(function (error) {
                alert(error);
              });
			
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