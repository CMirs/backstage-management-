<template>
  <div class="dashboard-editor-container">

    <panel-group />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <bar-chart />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <raddar-chart />
    </el-row>

   <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
    </el-row>-->


  </div>
</template>

<script>
  import PanelGroup from './PanelGroup'
  import BarChart from './BarChart'
  import RaddarChart from './RaddarChart'
/*  import PieChart from '../../../views/dashboard/PieChart'
  import BarChart from '../../../views/dashboard/BarChart'*/


  export default {
    name: 'Index',
    components: {
      PanelGroup,
      BarChart,
      RaddarChart,
     /* PieChart,
      BarChart*/
    },
    data() {
      return {
      }
    },

    methods: {
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

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
