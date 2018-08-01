/**
 * @author
 * @desc 
 */

/*import * as types from './mutations_types'
import * ad types from './mutatuins_types'*/
export default {
        switch_component_congif(state,type){    //这里的state对应着上面这个state
            state.dashcomponentstatus.config = type;
                                            //你还可以在这里执行其他的操作改变state
        }
}
