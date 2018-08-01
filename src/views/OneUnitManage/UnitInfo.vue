<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
    <div class="home">
        <!-- <head-nav></head-nav> -->
            <el-col :span="24">
            <div class="grid-content bg-purple-dark unit-title" >
                <strong v-text="unitName"></strong>
            </div>
            </el-col>
            <el-col :span="24">
                <el-tabs type="card" v-model="activeName" class="tab" >
                      <el-tab-pane label="门户" name="first">门户</el-tab-pane>
                      <el-tab-pane label="管理" name="second">
                          <el-col :span="4">
                            <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo left-menu">
                              <el-menu-item-group title="分组一">
                                <el-menu-item index="1"><i class="el-icon-message"></i>导航一</el-menu-item>
                                <el-menu-item index="2"><i class="el-icon-message"></i>导航二</el-menu-item>
                              </el-menu-item-group>
                              <el-menu-item-group title="分组二">
                                <el-menu-item index="3"><i class="el-icon-message"></i>导航三</el-menu-item>
                                <el-menu-item index="4"><i class="el-icon-message"></i>导航四</el-menu-item>
                              </el-menu-item-group>
                            </el-menu>
                        </el-col> 
                      </el-tab-pane>
                </el-tabs>  
            </el-col>
           
            <el-col :span="14">
               
            </el-col>
    </div>
</template>

<script>
    import UnitInfo from './UnitInfo.js';
    export default UnitInfo;
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
    .unit-title{
        height: 94px;
        background: #ffffff;
        padding-left:30px;
        padding-top:20px;
        font-size: 16px;
        color: #000;
    }
    .tab{
      
        min-height: 600px;
    }
    .left-menu{
       
    }
</style>
