
import axios from 'axios';
import $ from 'jquery';

import HeadNav from '../../../layout/head-nav/HeadNav.vue';
import certificateSumLine from "views/dash/dashComponent/certificateSumLine.vue";
import privateScoreTop from "views/dash/dashComponent/privateScoreTop.vue";
import certificateCountColumn from "views/dash/dashComponent/certificateCountColumn.vue";
import unitScoreTop from "views/dash/dashComponent/unitScoreTop.vue";
import logisticsMap from "views/dash/dashComponent/logisticsMap.vue"


import vueGridLayout from 'vue-grid-layout';
var GridLayout = vueGridLayout.GridLayout;
var GridItem = vueGridLayout.GridItem;
export default {
	data() {
      return {
      	/*看板*/
    	  layout:[
		          {"x":0,"y":0,"w":6,"h":10,"i":"A0",component:"certificateSumLine"},
		          {"x":0,"y":10,"w":6,"h":10,"i":"A1",component:"privateScoreTop"},
		          {"x":0,"y":20,"w":6,"h":10,"i":"A2",component:"certificateCountColumn"},
		          {"x":0,"y":30,"w":6,"h":10,"i":"A2",component:"logisticsMap"}
    	          ],
    	  layouttype:"A",
    	  beforemove :{},
    	  aftermoved :{},
		 formatLayoutVisible : false, 
		 layTable:[{id:1,src:require("../../../assets/A12.png"),laytype:"A"},
		           {id:2,src:require("../../../assets/AA12.png"),laytype:"AA"},
		           {id:3,src:require("../../../assets/AAA2.png"),laytype:"AAA"},
		           {id:4,src:require("../../../assets/AB112.png"),laytype:"AB"},
		           {id:5,src:require("../../../assets/BA11.png"),laytype:"BA"}
		           ],
		  addDashVisiable:false,
		  searchType :[{"name":"所有",num : "46"},
		               {"name":"图表",num : "18"},
		               {"name":"列表",num : "17"},
		               {"name":"其他",num : "10"}
		              ],/*看板搜索类型*/
		  searchIndex :0, 
		  addDashInput :'',
		  gadgetList :[],
		 
			  
		}
	},
    components:{
        HeadNav,
        privateScoreTop,
        GridLayout,
        GridItem,
        certificateSumLine,
        certificateCountColumn,
        logisticsMap
        
    },
	mounted() {
      
    },
    methods: {
        formatter(row, column) {
            return row.address;
          },
          formatLayout(){/*布局dialog打开*/
        	  this.formatLayoutVisible = true; 
          },
          layView(item){/*选择layout*/
        	  this.layouttype= item.laytype;
        	     /**
        	      * @author James
        	      * 用户是否保存过layout;保存过直接调数据库数据布局,没保存布局,以下列方式计算。
        	      * 默认列数为6
        	      * X 以前左上角为起点(0,0),x往右,y往下
        	      * w 所占 列数比例(列自由分配) 
        	      * h 所在高度 (单位未知),autoSize自动根据内容确定容器高度
        	      */
        	  if(item.laytype=="A"){
        		  /**
        		   * @desc 关系处理
        		   *  x 永远处于0
        		   *  y 之前组件h之和
        		   *  w 列数最大值(列数自由设置)
        		   */
        		  this.layout=[
		          {"x":0,"y":0,"w":6,"h":10,"i":"A0",component:"certificateSumLine"},
		          {"x":0,"y":6,"w":6,"h":10,"i":"A1",component:"privateScoreTop"},
		          {"x":0,"y":12,"w":6,"h":10,"i":"A2",component:"certificateCountColumn"}
    	          ]
        	  }else if(item.laytype=="AA"){
        		  /**
        		   * @desc 关系处理 两列布局
        		   *  x 奇数永远处于0 偶数列数/2 
        		   *  y 奇数==前奇数组件h之和  偶数==前偶数组件h之和
        		   *  w 列数最大值/2(列数自由设置)
        		   */
        		  this.layout=[
    	          {"x":0,"y":0,"w":3,"h":10,"i":"AA0",component:"certificateSumLine"},
    	          {"x":3,"y":0,"w":3,"h":10,"i":"AA1",component:"privateScoreTop"},
    	          {"x":0,"y":10,"w":3,"h":10,"i":"AA2",component:"certificateCountColumn"},
    	          {"x":3,"y":10,"w":3,"h":10,"i":"AA3",component:"certificateSumLine"},
    	          ]
        	  }else if(item.laytype=="AAA"){
        		  /**
        		   * @desc 关系处理 三列布局 m为组件个数
        		   *  x (m%3==1)为0, (m%3==2)为((列数/3)*1), (m%3==0)为((列数/3)*2)  
        		   *  y (m%3==1)为Math.floor((m/3))的h之和
        		   *    (m%3==2)为Math.floor((m/3))的h之和
        		   *    (m%3==0)为Math.floor((m/3))的h之和
        		   *  w (m%3==1)为(列数/3)
        		   *    (m%3==2)为(列数/3)
        		   *    (m%3==0)为(列数/3)
        		   */
        		  this.layout=[
    		    	          {"x":0,"y":0,"w":2,"h":6,"i":"0"},
    		    	          {"x":2,"y":0,"w":2,"h":6,"i":"1"},
    		    	          {"x":4,"y":0,"w":2,"h":6,"i":"2"},
    		    	          {"x":0,"y":6,"w":2,"h":6,"i":"3"},
    		    	          ]
        	  }else if(item.laytype=="AB"){
        		  /**
        		   * @desc 关系处理 两列布局
        		   *  x A列永远处于0 B列为(列数/3)*2 
        		   *  y A列==前A列组件h之和  B列==前偶数组件h之和
        		   *  w A列==(列数最大值/3)*2(列数自由设置) B列==(列数最大值/3)*1
        		   */
        		  this.layout=[
    		    	          {"x":0,"y":0,"w":4,"h":6,"i":"AB0"},
    		    	          {"x":4,"y":0,"w":2,"h":6,"i":"AB1"},
    		    	          {"x":0,"y":6,"w":4,"h":6,"i":"AB2"},
    		    	          {"x":4,"y":6,"w":2,"h":6,"i":"AB3"}]
        	  }else if(item.laytype=="BA"){
        		  /**
        		   * @desc 关系处理 两列布局
        		   *  x A列永远处于0 B列为(列数/3)*1 
        		   *  y A列==前A列组件h之和  B列==前偶数组件h之和
        		   *  w A列==(列数最大值/3)*1(列数自由设置) B列==(列数最大值/3)*2
        		   */
        		  this.layout=[
    		    	          {"x":0,"y":0,"w":2,"h":6,"i":"BA0"},
    		    	          {"x":2,"y":0,"w":4,"h":6,"i":"BA1"},
    		    	          {"x":0,"y":6,"w":2,"h":6,"i":"BA2"},
    		    	          {"x":2,"y":6,"w":4,"h":6,"i":"BA3"}]
        	  }
        	this.formatLayoutVisible = false;
          },
           cellClick(row, column, cell, event){
        	   this.$message({type:"info",message:"点我"});
           },
           moveEvent: function(i, newX, newY){
               console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
               this.beforemove={i:i,x:newX,y:newY};
           },
           movedEvent: function(i, newX, newY){
               console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
               
           },
           handleCommand(param){
           	 this.$message(param);
           },
           addDashButton(){
           	this.addDashVisiable = true;
           	this.$$api_dashBoard_getGadgetList({
           		data :{queryCriteria :{}},
           		fn   :data=>{
           			this.gadgetList = data.data;
           		},
           		errFn:(err)=>{
           			this.$message.error(err.msg);
           		},
           		tokenFlag   : true
           	})
           },
           searchType_Click(index){
           	this.searchIndex = index;
           },
           getTemplate(templateName){
           	return require("./../dashComponent/"+templateName+".vue");
           }
           
      },
      watch:{/*
    	  layout: {
    	      handler: function (val, oldVal) { 
    	    	  console.log( val)
    	    	   },
    	      deep: true
    	    }*/
    	  
      },
}