<template>
	<div class="carousel" style="width: 95%;margin: auto;">
		 <el-carousel 
		 	indicator-position="none"
		 	>
		    <el-carousel-item v-for="item in imgarray" :key="item.id" :initial-index="carIndex">
		      <img style="width: 100%;height: 70%;" v-bind:src="item.src"/>
		    </el-carousel-item>
	   </el-carousel>
	    <!--<el-row>
		  <el-col :span="4" v-for="(o, index) in imgarray" :key="o.id" :offset="1" @click="handel(o)" v-bind:class="index==carIndex ? 'select' : ''">
		    <el-card  >
		      <img v-bind:src="o.src" class="image" style="width: 100%;height: 10%;">
		    </el-card>
		  </el-col>
		</el-row>-->
  </div>
</template>

<script>
	import logisticsMapJs from "./logisticsMap.js"
	export default  logisticsMapJs 
</script>

<style>
	.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .select{
  	border: 1px solid red;
  }
</style>