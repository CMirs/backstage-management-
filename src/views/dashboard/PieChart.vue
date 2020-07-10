<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getMemberCountDay } from '@/api/index/index'

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
      data1:[]
    }
  },
  created() {
    this.getMember()
  },



  // mounted() {
  //   this.$nextTick(() => {
  //     this.initChart()
  //   })
  // },
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   this.chart.dispose()
  //   this.chart = null
  // },
  methods: {
    getMember() {
      getMemberCountDay().then(response => {
        console.log('ee', response)
        console.log('ee', response)
        this.data1 = response
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['普通用户', '采购商', '果农','停用']
        },
        series: [
          {
            name: '用户类型',
            type: 'pie',
            roseType: 'radius',
            radius: [20, 75],
            center: ['50%', '38%'],
            data: this.data1,
            /*在series中添加itemStyle即可直观显示饼型数值*/
            // itemStyle:{
            //   normal:{
            //     label:{
            //       show: true,
            //       formatter: '{b} : {c} ({d}%)'
            //     },
            //     labelLine :{show:true}
            //   }
            // },
            animationEasing: 'cubicInOut',
          }
        ]
      })
    }
  }
}
</script>
