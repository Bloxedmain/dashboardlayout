<template>
    <div class="list">
       
        <el-table border style="width: 100%" align='center'
            :data="tabelData">
            <el-table-column
              type="index"
              :label="fields.id.info.label"
              :width="fields.id.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.code.info.prop"
                :label="fields.code.info.label"
                :width="fields.code.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.name.info.prop"
                :label="fields.name.info.label"
                :sortable="fields.name.info.sortable">
            </el-table-column>
            <el-table-column
                :prop="fields.sortNum.info.prop"
                :label="fields.sortNum.info.label"
                :width="fields.sortNum.style.width">
            </el-table-column>
            <el-table-column
                :prop="fields.remark.info.prop"
                :label="fields.remark.info.label">
            </el-table-column>
        </el-table>
        <el-col :span="24" class='btm-action'>
            <el-pagination
                v-if='paginations.total>0'
                class='pagination'
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page='paginations.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'>
            </el-pagination>
        </el-col>
    </div>
</template>
<script>
    import TypeJs from './Type.js';
    export default TypeJs;
</script>
<style scoped lang='less'>
    .demo-form-inline{
        display: inline-block;
        float: right;
    }
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
    .actions-top{
        height: 46px;
    }
    .pagination{
        display: inline-block;
    }
</style>
