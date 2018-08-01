<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
    <div class="home">
        <head-nav></head-nav>
        <div class="left-fixed-right-auto">
            <div class="right-content">
                <div class="content" :style="{marginLeft:$store.state.leftmenu.width}">
                    <el-row>
                        <el-col :span="13" style="border-right:1px solid #f3f3f3;">
                        <div style="margin:0 0 15px 80px;"><strong>个人信息</strong></div>
                        <div class="form">
                            <el-form style="margin:0 20px 20px;" 
                                label-width="100px" 
                                :model="user_data"
                                ref='user_data'>
                                <el-form-item 
                                    label="图像">
                                    <img :src='user_data.imgSrc'/>
                                    <img />
                                </el-form-item>
                                <el-form-item 
                                    label="账号">
                                    <span v-text='user_data.account'></span>
                                </el-form-item>
                                <el-form-item label="全名">
                                    <span v-text='user_data.fullname'></span>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <span v-text='user_data.email'></span>
                                </el-form-item>
                                <el-form-item
                                    label='开始工作时间'>
                                    <span v-text='user_data.startTime'></span>
                                </el-form-item>
                                <el-form-item label="入职日期">
                                    <span v-text='user_data.date'></span>
                                </el-form-item>
                                <el-form-item label="用户组" >
                                    <span v-text='user_data.userGroup'></span>
                                </el-form-item>
                                <el-form-item label="机构角色" >
                                    <span v-html='user_data.unitRole'></span>
                                </el-form-item>
                                <el-form-item label="审批授权" >
                                    <span v-text='user_data.authority'></span>
                                </el-form-item>
                            </el-form>
                        </div>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <div style="margin-bottom:15px;"><strong>设置</strong></div>
                            <div style="font-size: 13px;">设置邮件免打扰：
                                <template>
                                    <el-checkbox v-model="checked" >仅收紧急</el-checkbox>
                                </template>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserInfo from './UserInfo.js';
    export default UserInfo;
    /*export default {
        name: 'info',
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
        }
    }*/
</script>
<style scoped>
    .el-form-item {
        margin-bottom: 0px;
    }
    .content{
        margin-top: 60px;
        /*background: #f1f2f7;*/
        background: #FFF;
        padding: 16px;
    }
    .right-content{
        margin-bottom: 60px;
    }
</style>
