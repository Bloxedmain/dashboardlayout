<template>
    <div class="login" :style="winSize">
        <el-row>
            <el-col :span='24'>
                <div class="content">
                    <el-form label-position="right" label-width="70px" class="demo-ruleForm card-box loginform"
                             v-loading="login_actions.disabled"
                             :element-loading-text="'正在'+(register===true ? '注册' : '登录')+'...'"
                             :style="formOffset"
                             :model='data'
                             :rules="rule_data"
                             ref='data'>
                        <h3 class="title">
                            <span
                                    :class="[{active:register===false}]"
                                    @click="toggleStatus(false)">上海机场通行证管理平台</span>
                        </h3>
                        <el-form-item
                                prop='userName' label="用户名">
                            <el-input type="text" auto-complete="off" placeholder=""
                                      v-model='data.userName'></el-input>
                        </el-form-item>

                        <el-form-item
                                prop='password' label="密码">
                            <el-input type="password" auto-complete="off" placeholder=""
                                      v-model='data.password'
                                      @keyup.native.enter="onLogin('data',true)"></el-input>
                        </el-form-item>

                        <el-form-item
                               label="动态口令">
                            <el-input type="text" auto-complete="off" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%;text-align:center;">
                            <!-- <el-input type="submit" placeholder="" >登录1</el-input> -->
                            <el-button type="primary"
                                       v-if="register===false"
                                       @click='onLogin("data")'>登录
                            </el-button>
                            <!-- <el-button @click='resetForm("data")'>重置</el-button> -->
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import LoginJs from './Login.js';
	export default LoginJs;
</script>

<style scoped lang='less'>
    @import url(Login.less);
</style>
