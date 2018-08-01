import axios from 'axios'
import $ from 'jquery'
export default {
    name: 'order-list',
    data() {
        var checkPostCode = (rule, value, callback) => {
            setTimeout(() => {
              if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
              } else {
                if (value.length != 6) {
                  callback(new Error('请输入6位长度的字符'));
                } else {
                  callback();
                }
              }
            }, 1);
          };
        return {
            expandedkeys:[11],
            curNodeKeys:11,
            dialogVisible:false,
            recordDialogVisible:false,
            SuperUnitDialogVisible:false,
            SuperUnit:'',
            showCertificateUnit:true,
            showOrHideUnit:true,
            recordTableData:[],
            recordTableCol:{
                time:'',
                info:''
            },
            business_type_options:
            [
                {value:1,label:'民航单位'},
                {value:2,label:'联检单位'},
                {value:3,label:'政法系统'},
                {value:4,label:'使领馆'},
                {value:5,label:'委托单位'},
                {value:6,label:'外单位'}
            ],
            formInfo:{
                cn_name:'',
                eng_name:'',
                business_type:'',
                legal_representative:'',
                pass_abbreviation:'',
                registration_addr:'',
                registration_date:'',
                business_addr:'',
                business_expire_date:'',
                pass_unit_code:'',
                postcode:'',
                approval_certificate:'',
                organization_id:'',
                parent_organization_id:''
            },
            formContact:{
                contact_phone:'',
                fax_number:'',
                contact_person:'',
                phone_number:'',
            },
            formInfoRules:{
                cn_name: [
                    { required: true, message: '请输入中文名称', trigger: 'blur' }
                ],
                business_type: [
                    { required: true, message: '请选择机构', trigger: 'blur' }
                ],
                pass_unit_code: [
                    { required: true, message: '请输入组织机构编码', trigger: 'blur' }
                ],
                postcode:[
                    /*{ type: 'number', message: '请输入数字',trigger: 'blur'},*/
                    { validator: checkPostCode, trigger: 'blur' }
                ]
            },
            tableData:[
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
                filename:{
                    info:{
                        prop:'filename',
                        label:'文件名'
                    },
                    style:{
                        width: '',
                        headerAlign:'center'
                    }
                },
                idCard:{
                    info:{
                        prop:'idCard',
                        label:'材料类型',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        align: 'center',
                        headerAlign:'center'
                    }
                },
                size:{
                    info:{
                        prop:'size',
                        label:'大小(kb)',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '120',
                        align: 'center',
                        headerAlign:'center'
                    }
                },
                enddate:{
                    info:{
                        prop:'enddate',
                        label:'有效截止期',
                        sortable: true
                    },
                    filter:{

                    },
                    style:{
                        width: '200',
                        align: 'center',
                        headerAlign:'center'
                    }
                }
            },
            infoRadio:'1',
            treedata: [{
              id:1,
              label: '上海机场控制区',
              children: [{
                id:11,
                isUnit:true,
                label: '中国东方航空股份有限公司',
                children: [{
                    id:111,
                    isUnit:true,
                    label: '上海飞行部',
                    children:[{
                        id:1111,
                        label:'人力资源部'
                    },{
                        id:1112,
                        label:'飞行一部'
                    },{
                        id:1113,
                        label:'飞行二部'
                    },{
                        id:1114,
                        label:'外单位',
                        children:[{
                            id:11141,
                            label:'上海航空股份有限公司'
                        }]
                    },{
                        id:1115,
                        label:'委托单位'
                    }]
                },{
                    id:112,
                    isUnit:true,
                    label: '客舱服务部',
                    children:[{
                        id:1121,
                        label:'人力资源部'
                    },{
                        id:1122,
                        label:'乘务一部'
                    },{
                        id:1123,
                        label:'乘务二部'
                    },{
                        id:1124,
                        label:'外单位',
                        children:[{
                            id:11241,
                            label:'上海制片厂' 
                        }]
                    },{
                        id:1125,
                        label:'委托单位'
                    }]
                },{
                    id:113,
                    isUnit:true,
                    label: '运行控制中心',
                    children:[{
                        id:1131,
                        label:'总值班室'
                    },{
                        id:1132,
                        label:'飞行签派处'
                    },{
                        id:1133,
                        label:'运行调度部'
                    },{
                        id:1134,
                        label:'外单位',
                        children:[{
                            id:11341,
                            label:'东航山东分公司运行控制中心' 
                        }]
                    }]
                },{
                    id:114,
                    isUnit:true,
                    label: '地面服务部',
                    children:[{
                        id:1141,
                        label:'纪委办公室（监察审计部）'
                    },{
                        id:1142,
                        label:'人力资源部'
                    },{
                        id:1143,
                        label:'地面运行控制中心'
                    },{
                        id:1144,
                        label:'虹桥站坪服务中心'
                    },{
                        id:1145,
                        label:'浦东旅客服务中心'
                    },{
                        id:1146,
                        label:'外单位',
                        children:[
                            {
                                id:11461,
                                label:'厦门民航凯亚有限公司'
                            }
                        ]
                    },{
                        id:1147,
                        label:'委托单位',
                        children:[
                            {
                                id:11471,
                                label:'上海东飞环境工程范围有限公司'
                            }
                        ]
                    }]

                },{
                  id:115,
                  label: '公司领导'
                },{
                  id:116,
                  label: '综合管理部'
                },{
                  id:117,
                  label: '财务会计部'
                },{
                  id:118,
                  label: '人力资源部'
                },{
                  id:119,
                  label: '企业管理部'
                },{
                  id:1191,
                  label: '采购中心'
                },{
                    id:1192,
                  label: '纪委办公室'
                },{
                    id:1193,
                  label: '保卫部'
                },{
                    id:1194,
                  label: '飞培公司'
                },{
                    id:1195,
                  label: '规划发展部'
                },{
                    id:1196,
                  label: '服务管理部'
                },{
                    id:1197,
                  label: '市场营销委员会'
                },{
                    id:1198,
                  label: '武汉分公司'
                },{
                    id:11991,
                  label: '山西分公司'
                },{
                    id:11992,
                  label: '安徽分公司'
                },{
                    id:11993,
                    label:'外单位',
                    children:[{
                        id:119931,
                        label:'东航传媒'
                    },{
                        id:119932,
                        label:'东航北京分公司'
                    }]
                },{
                    id:11994,
                    label:'委托单位'
                }]
              }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            uploadForm:{
                idCard:'',
                enddate:''
            },
            uploadFormRules:{
                enddate:[{type:'date',required: true, message: '请输入有效截止日期', trigger: 'blur' }]
            },
            fileList2:[]

        }
    },

    methods: {
        showIsUnit(){
            this.showCertificateUnit = !this.showCertificateUnit;
        },
        /*树节点渲染，办证机构前（显示房子图标）*/
        renderContent(h, { node, data, store }) {//<i class="fa fa-home">
            if(this.showCertificateUnit == false){//显示办证机构前的房子图标
                if(data.isUnit){//是办证机构，显示房子图标
                   return (
                        <span on-mouseover={ () => this.buttonShow(store, data) }>
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <i class="fa fa-home"></i>{data.label}<i class="el-icon-caret-bottom el-icon--right dropdownIcon" style="display:none;"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><el-button size="small" type="text" on-click={ () => this.append(store, data) }>增加子节点</el-button></el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <span style="float: right; margin-right: 20px;display:none;" class="ddd">
                        </span>
                      </span>); 
                }else{//不是办证机构，不显示房子图标
                    return (
                        <span on-mouseover={ () => this.buttonShow(store, data) }>
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            {data.label}<i class="el-icon-caret-bottom el-icon--right dropdownIcon" style="display:none;"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                             <el-dropdown-item><el-button size="small" type="text" on-click={ () => this.append(store, data) }>增加子节点</el-button></el-dropdown-item>
                            <el-dropdown-item><el-button size="small" type="text" on-click={ () => this.remove(store, data) }>删除当前节点</el-button></el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <span style="float: right; margin-right: 20px;display:none;" class="ddd">
                        </span>
                      </span>); 
                }
            }else{//隐藏办证机构，不显示房子图标
                if(data.isUnit){//办证机构，只显示增加子节点
                   return (
                        <span on-mouseover={ () => this.buttonShow(store, data) }>
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            {data.label}<i class="el-icon-caret-bottom el-icon--right dropdownIcon" style="display:none;"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><el-button size="small" type="text" on-click={ () => this.append(store, data) }>增加子节点</el-button></el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <span style="float: right; margin-right: 20px;display:none;" class="ddd">
                        </span>
                      </span>); 
                }else{ //非办证机构，显示增加子节点、删除节点
                    return (
                      <span on-mouseover={ () => this.buttonShow(store, data) }>
                        <el-dropdown >
                          <span class="el-dropdown-link">
                            {data.label}<i class="el-icon-caret-bottom el-icon--right dropdownIcon" style="display:none;"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><el-button size="small" type="text" on-click={ () => this.append(store, data) }>增加子节点</el-button></el-dropdown-item>
                            <el-dropdown-item><el-button size="small" type="text" on-click={ () => this.remove(store, data) }>删除当前节点</el-button></el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <span style="float: right; margin-right: 20px;display:none;" class="ddd">
                        </span>
                      </span>); 
                }
            }
        },
        /*store:树节点
        *data:当前节点（包含子节点)
        */
        append(store, data) {//展开并选中新增的子节点
            store.append({ label: '增加子部门节点',id:10000, children: [] }, data);
            this.expandedkeys = [data.id];
            this.curNodeKeys = 10000;
            this.infoRadio = "2";
        },
        remove(store, data) {
            store.remove(data);
        },
        buttonShow(store, data){
            
            $(".el-tree-node__content,.el-tree-node").each(function(){
                $(this).mouseover(function(){
                    if($(this).is(".is-expanded") == false){
                        $(this).eq(0).find(".ddd").css("display","block");
                        $(this).eq(0).find(".dropdownIcon").css("display","inline-block");
                    }
                }).mouseout(function(){
                    $(this).find(".ddd").css("display","none");
                    $(this).eq(0).find(".dropdownIcon").css("display","none");
                });
            });
        },
        handleNodeClick(data1,data2,data3) {
            if(data1.isUnit==true){
                this.infoRadio = "1";
            }else{
                this.infoRadio = "2";
            }
            this.$$api_organization_findOrgById({
              urlParams:{id:data1.id},
              fn        :  data => {
               console.log(data);
              },
              errFn     : (err) => {
                this.$message.error(err.msg);
               }
            });
        },
        handleNodeClickSuperUnit(data1,data2,data3){
            this.SuperUnit = data1.label;
            console.log(data1);
            console.log(data2);
            console.log(data3);
        },
        submitForm(){

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        submitForm(uploadForm){
            console.log(this.uploadForm.enddate.toLocaleDateString());
        },
        RadioChange(value){
            this.infoRadio = value;
        },
        selectSuperUnit(){
            
        },
        selectSuperUnitSure(){
            this.SuperUnitDialogVisible = false;
            console.log("发送请求");
        },
        tempSave(){
            //console.log(this.formInfo,this.formContact);
            this.$refs.formInfo.validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                return false;
              }
            });
            this.formInfo.organization_id = '11';
            this.$$api_organization_addChildOrganization({
              data:this.formInfo,
              fn        :  data => {
               this.$message.success("添加机构成功！");
              },
              errFn     : (err) => {
                this.$message.error(err.msg);
               }
            });
        },
        SaveCancell(){

        },
        loadNode(node, resolve) {
            console.log(data);
            this.$$api_organization_listPassOrganizations({
              urlParams:{id:node.id},
              fn        :  data => {
               console.log(data);
              },
              errFn     : (err) => {
                this.$message.error(err.msg);
               }
            });
        },
        getAllNodes(){
             var data = [
                    {
                      "organization_id": 1,
                      "parent_organization_id": 1
                    },
                    {
                      "organization_id": 11,
                      "parent_organization_id": 1
                    },{
                      "organization_id": 12,
                      "parent_organization_id": 1
                    },{
                      "organization_id": 111,
                      "parent_organization_id": 11
                    },
                    {
                      "organization_id": 1111,
                      "parent_organization_id": 111
                    },
                    {
                      "organization_id": 11111,
                      "parent_organization_id": 1111
                    },
                    {
                      "organization_id": 111111,
                      "parent_organization_id": 11111
                    },
                    {
                      "organization_id": 1111111,
                      "parent_organization_id": 111111
                    },
                    {
                      "organization_id": 112,
                      "parent_organization_id": 12
                    }
                ];
                
                for(var i in data){
                    var item1 = data[i];
                    
                    for(var j in data){
                        var item2 = data[j];
                        //根节点无父节点
                        if(item2.organization_id == item2.parent_organization_id){
                            continue;
                        }
                        //item2是item1的子节点
                        if(item2.parent_organization_id == item1.organization_id){
                            if(!item1.chids){
                                item1.chids = [];
                            }
                            item1.chids.push(item2.organization_id);
                        }
                    }
                }

                var dataObj = {};
                var dataTree = [];
                for(var i in data){
                    if(data[i].organization_id == data[i].parent_organization_id){
                        dataTree.push(data[i]);
                    }
                    dataObj[data[i].organization_id+''] = data[i];
                }
                /*console.log(JSON.stringify(data));
                console.log(JSON.stringify(dataObj));
                console.log(JSON.stringify(dataTree));*/
                getChildrens(dataTree);
                console.log(JSON.stringify(dataTree));

                function getChildrens(objs){ 
                    for(var key in objs){
                        var obj = objs[key];
                        if(obj.chids){
                            if(!obj.children){
                                obj.children = [];
                            }
                            for(var i in obj.chids){
                                var chid = obj.chids[i] + '';//获取到子对象的id
                                obj.children.push(dataObj[chid]);
                            }
                            delete obj.chids;
                            getChildrens(obj.children);
                        }
                    }
                }

            this.$$api_organization_findAllOrganizations({
              fn        :  res => {
                //var data = res.data;
                var data = [
                    {
                      "organization_id": 1,
                      "parent_organization_id": 1
                    },
                    {
                      "organization_id": 11,
                      "parent_organization_id": 1
                    },{
                      "organization_id": 12,
                      "parent_organization_id": 1
                    },{
                      "organization_id": 111,
                      "parent_organization_id": 11
                    },{
                      "organization_id": 112,
                      "parent_organization_id": 12
                    }
                ];
                /*for(var key in data){
                    var item = data[key];
                     for(var index in data){
                        if(data[index].organization_id !=data[index].parent_organization_id  
                            && item.parent_organization_id == data[index].organization_id){
                            data[index].children = item;
                        }
                     }
                }
                 for(var m in data){
                    if(data[m].parent_organization_id !=1){
                        delete data[m];
                    }
                 }
                console.log(data); */    
              },
              errFn     : (err) => {
                this.$message.error(err.msg);
               }
            });
        },
        getTreeData(data){
            
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                if (item.parent_organization_id == "") {
                    rst.push(item);
                } else {
                    var pid = item.parent_organization_id;
                    var elem = this.getParent(pid, rst);
                    if (elem) {
                        elem.child ? elem.child.push(item) : (elem.child = [item]);
                    }
                }
            }
           
        },
        getParent(pid, elems) {
            if (!elems) {
                return;
            }
            for (var i = 0, len = elems.length; i < len; i++) {
                var elem = elems[i];
                if (elem.organization_id == pid) {
                    return elem;
                } else {
                    return getParent(pid, elem.child);
                }
            }
        }

    },
    mounted() {
        this.getAllNodes()
    },
    '$route' (to, from) {
    }
}