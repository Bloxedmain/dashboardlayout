import HeadNav from '../../layout/head-nav/HeadNav.vue';
import axios from 'axios'
export default {
	data() {
      return {
			user_data : {
				imgSrc:'http://oa.usky.com.cn:8087/oaservice/images/user/avatar/useravatar-default.png',
				account:'wangping',
				fullname:'王萍',
				email   : 'wangping@usky.com.cn',
				startTime:'2017-05-08',
				date:'2017-05-08',
				userGroup:'系统管理员',
				unitRole:'项目成员-九元二期(JAIRII)<br/>项目成员-空防办证17年升级项目(KFBZSJ)<br/>项目成员-Usky OA项目管理平台(UOA)<br/>项目管理员-Usky OA项目管理平台(UOA)<br/>开发工程师-Usky OA项目管理平台(UOA)<br/>项目经理-Usky OA项目管理平台(UOA)<br/>部门成员-开发部(development)',
				authority:''
			},
			checked:false
		}
	},
    components:{
        HeadNav
    },
	mounted() {
      
    }
}