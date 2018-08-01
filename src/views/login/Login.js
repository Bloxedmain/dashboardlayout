/**
 * Created by sailengsi on 2017/5/11.
 */
import axios from 'axios'
export default {
	name   : 'login',
	data() {
		return {
			winSize: {
				width : '',
				height: ''
			},
			formOffset: {
				position: 'absolute',
				left    : '',
				top     : ''
			},
			remumber: this.$store.state.user.remumber,

			register: false,

			login_actions: {
				disabled: false
			},

			data: {
				userName: '',
				password: '',
				// token: ''
			},

			rule_data: {
				username  : [{
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error('请输入用户名'));
						} else {
							if (/^[a-zA-Z0-9_-]{1,16}$/.test(value)) {
								callback();
							} else {
								callback(new Error('用户名至少1位,由大小写字母和数字,-,_组成'));
							}
						}
					},
					trigger  : 'blur'
				}],
				password  : [{
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error('请输入密码'));
						} else {
							if (!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))) {
								callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'));
							} else {
								if (this.register === true) {
									if (this.data.repassword !== '') {
										this.$refs.data.validateField('repassword');
									}
								}
								callback();
							}

						}
					},
					trigger  : 'blur'
				}]
			}
		}
	},
	methods: {
		setSize() {
			this.winSize.width  = this.$$lib_$(window).width() + "px";
			this.winSize.height = this.$$lib_$(window).height() + "px";

			this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px';
			this.formOffset.top  = (parseInt(this.winSize.height) / 2 - 178) + 'px';
		},

		onLogin(ref, type) {
			//var url = 'http://192.168.1.140:8080';
			this.$refs[ref].validate((valid) => {
				if (valid) {
					this.$$api_loginUnit_getLastUnitList({
		                path : '/pass/org/getLastLoginUnitByAccount/'+this.data.userName,
		                fn:response_data=>{
		                    var goUrl = response_data.rest_service_context;
		                    var unitId = response_data.id;
		                    this.login_actions.disabled = true;
							var loginFrame = document.createElement('iframe');
							loginFrame.style.display = 'none';
							loginFrame.setAttribute('src',goUrl+'/loginHandler.html?username='+this.data.userName+"&pwd="+this.data.password +"&unitId="+unitId+ '&parentUrl=' + escape(
            window.parent.location.protocol + '//' + window.parent.location.host));
							/*loginFrame.setAttribute('src','http://localhost:8888/loginHandler.html?username='+this.data.userName+"&pwd="+this.data.password +"&unitId="+unitId+ '&parentUrl=' + escape(
            window.parent.location.protocol + '//' + window.parent.location.host));*/
							document.body.appendChild(loginFrame);
		                    fn && fn();
		                }
		            });
				}
			});
		},
		resetForm(ref) {
			this.$refs[ref].resetFields();
		},
		toggleStatus(type){
			this.register = type;
			if (this.register === true) {
				this.$set(this.data, 'repassword', '');
			} else {
				this.$delete(this.data, 'repassword');
			}
		}
	},
	created() {
		this.setSize();
		this.$$lib_$(window).resize(() => {
			this.setSize();
		});

		// 供iframe子页面调用vue的弹出组件
		window.globalVueMessage = this.$message;
		window.globalVueLoginActions = this.login_actions;
	},
	mounted() {
		// this.toggleStatus(true);
		// console.log(this.remumber);
		//如果上次登录选择的是记住密码并登录成功，则会保存状态，用户名以及token
	}
}
