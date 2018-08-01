<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="unit"
      label="单位"
      sortable>
    </el-table-column>
    <el-table-column
      prop="score"
      label="分值">
    </el-table-column>
  </el-table>
</template>

<script>
	import unitScoreTopJs from "./unitScoreTop.js";
	export default unitScoreTopJs
</script>

<style>
</style>