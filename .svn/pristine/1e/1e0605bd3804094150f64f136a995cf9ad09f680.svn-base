<template>
  <div :class="className" :style="{height:height,width:width}"/>

</template>

<script>
  import echarts from 'echarts'
  import resize from '../../../views/dashboard/mixins/resize'
  import { getSevenOrderMonenyDay } from '@/api/index/index'

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

        getSevenOrderMonenyDay().then(response => {

        this.number1= response.count;
        this.number2= response.tuikuang;

        this.date1 = response.dateStringList;

         /* response.tbOrderList.forEach((item)=>{
            this.number1.push(item.payment)
            this.date1 .push(item.formtCreated)
          })*/


          this.initChart()
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          title: {
            text: "近30天交易金额"
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
          legend: {
            data: ['成交金额', '退款金额']
          },
          series: [{
            name:'成交金额',
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
            data: this.number1,
          },
            {
              name:'退款金额',
              itemStyle: {
                normal: {
                  color: '#32893B',
                  lineStyle: {
                    color: '#32893B',
                    width: 2
                  },
                  label : {show: true}
                },
              },
              smooth: false,
              type: 'line',
              data: this.number2,
            }
          ]
        }/*{
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
        }*/)
      }
    }
  }
</script>
