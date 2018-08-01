import echarts from 'echarts';
console.log(echarts);
export default {
    name: 'echarts',
    data() {
        return {
            chartColumn: null,
        }
    },
    mounted: function() {
        var _this = this;
        if (this.chartColum && this.chartColum.dispose) { 
		this.chartColum.dispose(); 
		}
        //基于准备好的dom，初始化echarts实例
        this.chartColumn = echarts.init(document.getElementsByClassName('chartColumn')[0]);
        this.chartColumn.setOption({
            title: {
                text: ''
            },
            tooltip: {},
            xAxis: {
                data: ["一月", "二月", "三月", "四月", "五月", "六月"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });


    }
}