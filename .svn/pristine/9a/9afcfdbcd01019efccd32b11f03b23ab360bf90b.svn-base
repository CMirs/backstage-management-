<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'
  import { getOrderStatusCountDay } from '@/api/index/index'

  require('echarts/theme/macarons') // echarts theme


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
        default: '300px'
      }
    },
    data() {
      return {
        chart: null,
        number1: [],
        number2: [],
        number3: [],
        number4: [],
        date1: []
      }
    },
    created() {
      this.getOrderStatus()
    },

    methods: {
      getOrderStatus() {
        getOrderStatusCountDay().then(response => {
          this.number1 = response.count1
          this.number2 = response.count2
          this.number3 = response.count3
          this.number4 = response.count4
          this.date1 = response.date
          this.initChart()
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          // title: {
          //   text: '一件代发订单',
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },

          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: this.date1,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [
            {
              name: '待发货',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: this.number1,
            }, {
              name: '已发货',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: this.number2,
            }, {
              name: '交易成功',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: this.number3,
            }, {
              name: '待退款',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: this.number4,
            }
          ]
        })
      }
    }
  }
</script>
