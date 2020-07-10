<template>


  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :rules="rules"  :inline="true" label-width="68px">

      <el-form-item label="日期" prop="time">
        <el-date-picker
          v-model="queryParams.time"
          value-format="yyyy-M"
          type="month"
          placeholder="选择月"
          :picker-options="pickerOptions0">

        </el-date-picker>
      </el-form-item>

      <el-form-item label="城市" prop="city">

        <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                      @selected="onSelected"></v-distpicker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">

      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['gen:weather:export']"
        >导出</el-button>
      </el-col>
    </el-row>



    <div class="listing-distribution" ref="listingDistribution" style="height: 700px;width: 1500px;" >

    </div>


  </div>
</template>

<script>
 import { listWeather, getWeather, delWeather, addWeather, updateWeather, exportWeather } from "@/api/market/weather";
 import VDistpicker from 'v-distpicker'

// const lineChartData2 = {
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false,
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [{
//     data: [820, 932, 901, 934, 1290, 1330, 1320],
//     type: 'line',
//     smooth:false,
//     areaStyle: {}
//   }],
//   isinit: false
// }

export default {
  components: {VDistpicker},
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      time:"",
      //省市区
      temp: {
        address__province: '广东省',
        address__city: '湛江市',
        address__dist: '徐闻县'
      },
      shijian:[],//echarts
      wendu:[],//echarts
      nwendu:[],//echarts
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 十大市场天气预报表格数据
      weatherList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {

        time: undefined,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        time: [
          {required: true, message: "时间不能为空", trigger: "blur"}
        ],
        city: [
          {required: true, message: "城市不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getNowDate();
  this.queryParams.time = this.time
   this.queryParams.city = this.temp.address__city.replace("市","")
    this.getList();
  },
  mounted(){
    // console.log(this.$props.ds,"feduyewgfuy`")
    this.everyMonthListingDistribution();
    console.log("aghdffffddgg")
  },
  methods: {

    getNowDate(){
      var date = new Date();
      var year = date.getFullYear();
      var yue = date.getMonth();
      this.time = year+"-"+yue
    console.log(this.time+"获取当前的时间")


    },
    // 折线图
    everyMonthListingDistribution() {
      let option = {
        title: {
          text: '历史天气',

        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高气温', '最低气温']
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "3%",

          // containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.shijian
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
      /*  dataZoom :{
          orient:"horizontal", //水平显示
          show:true, //显示滚动条
          start:0, //起始值为0%
          end:40  //结束值为40%
        },*/
        series: [
          {
            label: {
              show: true,

            },
            name: '最高气温',
            type: 'line',
            data: this.wendu,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            label: {
              show: true,

            },
            name: '最低气温',
            type: 'line',
            data: this.nwendu,
            markPoint: {
              data: [
                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'},
                [{
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                }, {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: '最大值'
                  },
                  type: 'max',
                  name: '最高点'
                }]
              ]
            }
          }
        ]
      };

      //
      var listingDistribution =this.$echarts.init(this.$refs.listingDistribution);
      // 使用刚指定的配置项和数据显示图表。
      listingDistribution.setOption(option);
    },



    /** 查询十大市场天气预报列表 */
    getList() {
      this.shijian=[],
        this.wendu=[],
        this.nwendu=[]

      listWeather(this.queryParams).then(response => {

        console.log('开始生成折线图>>>>>')
        console.log(response.result)
        response.result.forEach((item)=>{
          this.shijian.push(item.ymd)
          this.wendu.push(parseInt(item.bwendu))//白天
          this.nwendu.push(parseInt(item.ywendu))//夜晚
        })


        console.log(this.shijian+"时间")
        console.log(this.wendu,"温度")
          this.$nextTick(function () {
            this.everyMonthListingDistribution()
          })

      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.temp = {
        address__province: '广东省',
        address__city: '湛江市',
        address__dist: '徐闻县'
      },

      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.city = this.temp.address__city.replace("市","")
      if (this.queryParams.time==null){
        this.msgError('请选择时间')
        return;
      }else {
        this.getList();
      }
     // this.queryParams.pageNum = 1;

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset();
      this.getList();
    },

    /** 新增按钮操作 */




    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有十大市场天气预报数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportWeather(queryParams);
        }).then(response => {

          this.download(response.msg);
          console.log(response.msg+"1111111111111111111")
        }).catch(function() {});
    },
    onSelected(data) {
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__dist = data.area.value
      this.queryParams.city = this.temp.address__city.replace("市","")
    }
  }
};
</script>

<style  scoped>
  .listing-distribution{
    width: 100%;
    height:100%
  }
</style>
