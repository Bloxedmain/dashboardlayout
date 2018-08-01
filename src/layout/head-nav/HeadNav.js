import axios from 'axios'
export default {
    name: 'head-nav',
    data() {
        return {
            UnitName:'用户登陆信息',
            LastUnit:{},//当前登录的机构
            unitItems:[]//可登录的机构列表
        }
    },
    mounted() { 
        /**
         * 验证是否处于登录状态
         */
        this.$$api_user_session({
            headers :{'Accept': 'application/json'}, 
            fn       : data => {
                this.update_userinfo(data);
            },
            errFn    : (err) => {
                this.$message.error(err.msg);
                this.login_actions.disabled = false;
            },
            tokenFlag: true
        });
    },
    methods: {
        update_userinfo(data){
            this.$store.dispatch('update_userinfo', {
                userinfo: {
                    'username':data.user.account,
                    'unit':{
                        'id':data.unit.unit_id,
                        'description':data.unit.description,
                        'rest_service_context':data.unit.rest_service_context
                    }
                }
            }).then(() => {
                 if(this.$store.state.user.userinfo){
                    this.getLastUnit();//获取当前登录机构
                    
                 }
            });
        },
        /**
         * 切换机构
         */
        handleCommand(command) {
            /**
             * 判断目标地址和当前地址是否处于同一域名下
             */
            var hrefUrl = command.rest_service_context;
            var CurrentDomain = window.location.host;
        
            if(CurrentDomain.indexOf(hrefUrl)!=-1){                            //同域名
                this.$router.push('/switchUnit/'+command.id);
            }else{                                                             //不同域名
                window.location.href = hrefUrl+"/#/switchUnit/"+command.id;
                //window.location.href = "http://localhost:8888"+"/#/switchUnit/"+command.id;

            }
        },
        /**
         * 获取用户最近一次登录的机构
         */
        getLastUnit(){
            this.$$api_loginUnit_getLastUnitList({
                path : '/pass/org/getLastLoginUnitByAccount/'+this.$store.state.user.userinfo.username,//'test'
                fn:response_data=>{
                    this.UnitName = response_data.description;
                    this.LastUnit = response_data;
                    this.getUnitList();//获取机构列表
                    fn && fn();
                }
            });
        },
        /**
         * 获取用户授权访问机构列表
         */
        getUnitList(){
            this.$$api_order_getUnitList({
                path:"/pass/org/getAuthorizedUnitByAccount/"+this.$store.state.user.userinfo.username,
                fn:response_data=>{
                    /*将当前登录的机构剔除*/
                    if(this.LastUnit){
                        for(var i= 0;i<response_data.length;i++){
                            if(response_data[i].id == this.LastUnit.id){
                                response_data.splice(i,1);
                            }
                        }
                    }
                    this.unitItems = response_data;
                    fn && fn();
                }
            });
        },
        /**
         * 退出登录
         */
        logout() {
            this.$confirm('你确定退出登录么?', '确认退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_user_loginOut({
                    fn:response_data=>{

                    }
                })
                this.$store.dispatch('remove_userinfo').then(() => {
                    this.$router.push('/loginONlocale');
                });
            }).catch(() => {
                /*this.$message({
                    type: 'info',
                    message: '已取消退出登录'
                });*/          
            });
        },
        /**
         * 弹出框-修改密码或者系统设置   
         * @param {string} cmditem 弹框类型
         */
        setDialogInfo(cmditem) {
            if (!cmditem) {
                this.$message('菜单选项缺少command属性');
                return;
            }
            switch (cmditem) {
                case 'info':
                    this.$router.push('/userinfo');
                    /*this.$router.push({
                        path: '/demo/user/edit',
                        query: {
                            id: this.$store.state.user.userinfo.id
                        }
                    });*/
                    break;
                case 'pass':
                    this.dialog.show_pass = true;
                    this.dialog.title = '修改密码';
                    break;
                case 'set':
                    this.onGetSetting();
                    this.dialog.show_set = true;
                    this.dialog.title = '系统设置';
                    break;
				case 'logout':
					this.logout();
					break;
            }
        },
        /**
         * 获取系统设置信息
         */
        onGetSetting() {
            //获取系统设置信息
            if (this.$store.state.user.userinfo.pid == 0) {
                this.$$api_system_getSetting({
                    fn:data=>{
						if (data.setting_info.disabled_update_pass) {
							data.setting_info.disabled_update_pass = data.setting_info.disabled_update_pass.split(',');
						} else {
							data.setting_info.disabled_update_pass = [];
						}
						data.setting_info.login_style = data.setting_info.login_style + '';

						this.dialog.set_info = data.setting_info;
                    }
                });
            } else {
                this.$message.error('只有管理员才能操作！');
            }
        }
    }
}