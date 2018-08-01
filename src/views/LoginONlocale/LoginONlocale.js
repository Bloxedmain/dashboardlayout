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
			register: false,
			login_actions: {
				disabled: false
			},
			unitId:'',
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
			
			this.$refs[ref].validate((valid) => {
				if (valid) {
					if(this.$store.state.user.willSwitchUnitId!==null){
						this.unitId = this.$store.state.user.willSwitchUnitId;
						this.loginAjax();
					}else{
			        	this.$$api_loginUnit_getLastUnitList({
			                path : '/pass/org/getLastLoginUnitByAccount/'+this.data.userName,
			                fn:response_data=>{
			                    this.unitId = response_data.id;
								this.loginAjax();
			                    fn && fn();
			                }
			            });
			        }
				}
			});
		},
		loginAjax(){
			this.$$api_user_login({ 
				data     : 'userName='+this.data.userName+'&password='+this.data.password+"&unitId="+this.unitId,
				headers :{'Content-Type': 'application/x-www-form-urlencoded'},
				fn       : data => {
					this.$store.dispatch('update_willSwitchUnitId', {
				        willSwitchUnitId:null
				    }).then(() => {
				    	this.login_actions.disabled = true;
						this.$router.push('/');
				    });
				},
				errFn    : (err) => {
					this.$message.error(err.msg);
					this.login_actions.disabled = false;
				},
				tokenFlag: true
			});
		},
		toggleStatus(type){
			this.register = type;
			if (this.register === true) {
				this.$set(this.data, 'repassword', '');
			} else {
				this.$delete(this.data, 'repassword');
			}
		},
		/**
             * 获取地址栏参数
             */
        getURLParameter(name) {
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search || location.hash) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }
	},
	created() {
		this.setSize();
		this.$$lib_$(window).resize(() => {
			this.setSize();
		});
	},
	mounted() {
		// this.toggleStatus(true);
		// console.log(this.remumber);
		//如果上次登录选择的是记住密码并登录成功，则会保存状态，用户名以及token
	}
}
