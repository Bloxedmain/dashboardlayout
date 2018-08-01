/**
 * Created by sailengsi on 2017/5/10.
 */

export default {
	getUserinfo(state) {
		return state.userinfo;
	},
	getwillSwitchUnitId(state) {
		return state.willSwitchUnitId;
	},
	getToken(state) {
		return state.userinfo && state.userinfo.token ? state.userinfo.token : '';
	}
};