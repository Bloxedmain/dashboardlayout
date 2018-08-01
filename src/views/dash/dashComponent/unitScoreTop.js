export default {
    data() {
      return {
        tableData: [{
          unit: '上海东方航空有限公司',
          score: '30'
        }, {
          unit: '上海惊鸿保安服务股份有限公司',
          score: '10'
        }, {
          unit: '顺丰航空有限公司上海营业部',
          score: '20'
        }, {
          unit: '上海圆通国际货物运输代理有限公司',
          score: '50'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
  }