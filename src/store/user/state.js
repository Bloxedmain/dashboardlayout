/**
 * Created by sailengsi on 2017/5/10.
 */
import {
	store
} from 'utils/';

export default {
	//登录成功后的用户信息
	//userinfo: store.get('userinfo') || {},
	userinfo:{
		username: null,
		unit: {
			 id: null,
			 description: null,
			 rest_service_context: null
		}
	},
	willSwitchUnitId: null
};