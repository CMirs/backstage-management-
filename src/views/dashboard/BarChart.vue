<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'
  import { getOrderCountDay } from '@/api/index/index'

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
        date1: []
      }
    },
    created() {
      this.getOrder()
    },

    methods: {
      getOrder() {
        getOrderCountDay().then(response => {
          this.number1 = response.count
          this.number2 = response.successCount
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
              name: '失败订单',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: this.number1,
            }, {
              name: '成功订单',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: this.number2,
            }
            // , {
            //   name: 'pageC',
            //   type: 'bar',
            //   stack: 'vistors',
            //   barWidth: '60%',
            //   data: [30, 52, 200, 334, 390, 330, 220],
            //   animationDuration
            // }
          ]
        })
      }
    }
  }
</script>
