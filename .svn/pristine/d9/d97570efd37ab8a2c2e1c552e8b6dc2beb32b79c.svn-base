<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">

      <el-form-item label="品种" prop="varietiesId">
        <el-select v-model="queryParams.varietiesId" filterable size="small">
          <el-option
            v-for="dict in varietiesOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="市场" prop="marketId">
        <el-select v-model="queryParams.marketId" filterable size="small">
          <el-option
            v-for="dict in marketOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>

      <!--<el-form-item label="报价日期" prop="offerDate">-->

        <!--<el-date-picker clearable size="small" style="width: 200px"-->

                        <!--v-model="queryParams.offerDate"-->

                        <!--type="date"-->

                        <!--value-format="yyyy-MM-dd"-->

                        <!--placeholder="选择报价日期">-->

        <!--</el-date-picker>-->

      <!--</el-form-item>-->

      <el-form-item>

        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>

        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>

      </el-form-item>

    </el-form>


    <el-row :gutter="32">
      <!--今日数据-->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart :chart-data="todayData" v-if="todayData.isinit"/>
        </div>
      </el-col>

      <!--近七天数据-->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart :chart-data="weekData" v-if="weekData.isinit"/>
        </div>
      </el-col>
    </el-row>

    <!--近三十天数据-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="monthData" v-if="monthData.isinit"/>
    </el-row>

  </div>
</template>

<script>

  import { getXuWenLineData, getMarketList } from '@/api/market/everydayprice/index'
  import {getVarietiesList} from "@/api/carpool/carpool";
  import LineChart from './LineChart'

  const lineChartData = {
    title: {
      text: 'ECharts 入门示例'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth:false,
      areaStyle: {}
    }],
    isinit: false
  }
  const lineChartData1 = {
    title: {
      text: 'ECharts 入门示例'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth:false,
      type: 'line',
      areaStyle: {}
    }],
    isinit: false
  }
  const lineChartData2 = {
    title: {
      text: 'ECharts 入门示例'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth:false,
      areaStyle: {}
    }],
    isinit: false
  }

  export default {
    name: 'Index',
    components: {
      LineChart

    },
    data() {
      return {
        todayData: lineChartData,
        weekData: lineChartData1,
        monthData: lineChartData2,
        varietiesOptions: [],
        marketOptions: [],
        // 查询参数

        queryParams: {
          varietiesId:10,
          marketId:40
        },
      }
    },
    created() {
      this.resetData();
      this.getVarieties()
      this.getMarket()    },
    methods: {

      //品种选择
      getVarieties() {
        getVarietiesList().then(response => {
          this.varietiesOptions = response.result
        })
      },
      //市场选择
      getMarket() {
        getMarketList().then(response => {
          this.marketOptions = response.result
        })
      },

      /** 搜索按钮操作 */

      handleQuery() {
        this.resetData()
      },

      /** 重置按钮操作 */

      resetQuery() {

        this.resetForm('queryForm')

        this.handleQuery()

      },

      resetData() {
        this.getListData()
      },
      getListData() {
        getXuWenLineData(this.queryParams).then(response => {
            console.log('开始生成折线图>>>>>')
            console.log(response.result)
            var todayData = response.result.today
            var weekData = response.result.week
            var monthData = response.result.month

            if (null != todayData) {
              this.todayData.xAxis.data = todayData.keyList
              this.todayData.xAxis.name = '时间'
              this.todayData.series[0].data = todayData.priceList
              this.todayData.series[0].name = '价格'
              this.todayData.title.text = '今日'+response.result.marketName+'价格折线图'
              this.todayData.isinit = true
            }
            if (null != weekData) {
              this.weekData.xAxis.data = weekData.keyList
              this.weekData.xAxis.name = '日期'
              this.weekData.series[0].data = weekData.priceList
              this.weekData.series[0].name = '价格'
              this.weekData.title.text = '近七天'+response.result.marketName+'价格折线图'
              this.weekData.isinit = true

            }
            if (null != monthData) {
              this.monthData.xAxis.data = monthData.keyList
              this.monthData.xAxis.name = '日期'
              this.monthData.series[0].data = monthData.priceList
              this.monthData.series[0].name = '价格'
              this.monthData.title.text = '近三十天'+response.result.marketName+'价格折线图'
              this.monthData.isinit = true
            }

          }
        )
      },
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
