<template>
  <div class="listing-distribution" ref="listingDistribution" style="height: 700px;width: 100%;" >

  </div>
</template>
<script>
  import { listWeather, getWeather, delWeather, addWeather, updateWeather, exportWeather } from "@/api/market/weather";
  export default {
    data(){
      return{
       shijian:[],
        wendu:[],

      }
    },
    // props:{
    //   ds:''
    // },
    mounted(){
      // console.log(this.$props.ds,"feduyewgfuy`")
      this.everyMonthListingDistribution();
      console.log("aghdffffddgg")
    },
    methods:{

      // 柱状图
      everyMonthListingDistribution() {
        let option = {
          xAxis: {
            type: 'category',
            data: shijian
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: wendu,
            type: 'line',
            smooth: true
          }]
        };

        //
        var listingDistribution =this.$echarts.init(this.$refs.listingDistribution);
        // 使用刚指定的配置项和数据显示图表。
        listingDistribution.setOption(option);
      }
    }


  }
</script>
<style  scoped>
  .listing-distribution{
    width: 100%;
    height:100%
  }
</style>
