export default {
    data() {
      return {
        tableData: [{
          name: '王小虎',
          code: '身份证 310109196012010221',
          score:10
        }, {
          name: '王虎',
          code: '身份证 310109196012010222',
          score:20
        }, {
          name: '王中虎',
          code: '身份证 310109196012010223',
          score:30
        }, {
          name: '王大虎',
          code: '身份证 310109196012010224',
          score:40
        }],
         filterForm: {
        	name : "",
        	type_id :""
        },
         typeOptions: [{
            value: "1",
            label: '办证中心'
          }, {
            value: "2",
            label: '办证单位'
          }, {
            value: "3",
            label: '监管中心'
          }],
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      onfilter(){
          this.$message("修改vuex模式");
         var config = 'browse'; 
         this.$store.commit('switch_component_congif',config)
      },
       oncleanFilter(){
          this.$message("修改vuex模式");
         var config = 'browse'; 
         this.$store.commit('switch_component_congif',config)
      },
    },
    mounted (){
    },
    computed: {
	  count (){
	      return this.$store.state.dashBoardCall.dashcomponentstatus
	    }
    }
    
  }