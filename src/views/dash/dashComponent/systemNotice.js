export default {
    data() {
      return {
        tableData: [
        ]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
  }