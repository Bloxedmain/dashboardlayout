/**
 * Created by sailengsi on 2017/5/10.
 */
import {
	store
} from 'utils/';


import * as types from './mutations_types'


export default {
	[types.UPDATE_USERINFO](state, user_db) {
		state.userinfo = user_db.userinfo || {};
		store.set('userinfo', state.userinfo);
	},

	[types.UPDATE_WILLSWITCHUNITID](state, willSwitchUnitId_db) {
		state.willSwitchUnitId = willSwitchUnitId_db.willSwitchUnitId || null;
		store.set('willSwitchUnitId', state.willSwitchUnitId);
	},

	[types.REMOVE_USERINFO](state) {
		store.remove('userinfo');
		state.userinfo = {};
	}
};