<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getXuWenLineDataByMonth } from '@/api/market/everydayprice/index'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      chart: null,
      date1: [],
      date2: []
    }
  },
  created() {
    this.Month()
  },

  methods: {
    Month() {
      getXuWenLineDataByMonth().then(response => {
        if(response.result!=null){
          this.date1 = response.result.keyList
          this.date2 = response.result.priceList
        }
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: "徐闻菠萝产地行情（30天）"
        },
        xAxis: {
          name: '日期',
          data: this.date1,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [{
          name:'价格(元)',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              label : {show: true}
            },
          },
          smooth: false,
          type: 'line',
          data: this.date2,
        }
        ]
      })
    }
  }
}
</script>
