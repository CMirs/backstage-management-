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

      <el-form-item label="报价日期" >
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>

        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>

        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>

      </el-form-item>

    </el-form>


    <el-row :gutter="10" class="mb8">

      <el-col :span="1.5">

        <el-button

          type="primary"

          icon="el-icon-plus"

          size="mini"

          @click="handleAdd"

          v-hasPermi="['day:add']"

        >发布
        </el-button>

      </el-col>

      <el-col :span="1.5">

        <el-button

          type="success"

          icon="el-icon-edit"

          size="mini"

          :disabled="single"

          @click="handleUpdate"

          v-hasPermi="['day:edit']"

        >修改
        </el-button>

      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['day:export']"
        >导出</el-button>
      </el-col>
    </el-row>


    <el-table v-loading="loading" :data="dayList" @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55" align="center"/>

      <el-table-column label="id" align="center" prop="id"/>

      <el-table-column label="市场名称" align="center" prop="marketName"/>

      <el-table-column label="售价" align="center" prop="price"/>

      <el-table-column label="对比上一次价格的描述" align="center" prop="mark"/>

      <el-table-column label="发布人" align="center" prop="createUser"/>

      <el-table-column label="品种名字" align="center" prop="varietiesName"/>

      <el-table-column label="报价日期" align="center" prop="offerDate" width="180">
      </el-table-column>

      <el-table-column label="创建日期" align="center" prop="created" width="180">

        <template slot-scope="scope">

          <span>{{ parseTime(scope.row.created) }}</span>

        </template>

      </el-table-column>

      <el-table-column label="修改日期" align="center" prop="updated" width="180">

        <template slot-scope="scope">

          <span>{{ parseTime(scope.row.updated) }}</span>

        </template>

      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">

        <template slot-scope="scope">

          <el-button

            size="mini"

            type="text"

            icon="el-icon-edit"

            @click="handleUpdate(scope.row)"

            v-hasPermi="['day:edit']"

          >修改
          </el-button>


        </template>

      </el-table-column>

    </el-table>


    <pagination

      v-show="total>0"

      :total="total"

      :page.sync="queryParams.pageNum"

      :limit.sync="queryParams.pageSize"

      @pagination="getList"

    />


    <!-- 添加或修改市场报价对话框 -->

    <el-dialog :title="title" :visible.sync="open" width="500px">

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="菠萝品种" prop="varietiesId">
          <el-select
            v-model="form.varietiesId"
            filterable
            placeholder="请选择菠萝品种"
            clearable
            size="small"
            style="width: 240px;height: 40px "
          >
            <el-option
              v-for="dict in varietiesOptions"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择所属市场" prop="marketId" label-width="80">

          <el-select
            v-model="form.marketId"
            placeholder="选择所属市场"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in marketOptions"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="报       价" prop="price" label-width="80">
          <el-input-number v-model="form.price"  :min="0.1" placeholder="请输入金额" />
        </el-form-item>


        <el-form-item label="报价日期" prop="offerDate">

          <el-date-picker clearable size="small" style="width: 200px"

                          v-model="form.offerDate"

                          type="datetime"

                          value-format="yyyy-MM-dd  HH:mm:ss"

                          placeholder="选择报价日期">

          </el-date-picker>

        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button type="primary" @click="submitForm">确 定</el-button>

        <el-button @click="cancel">取 消</el-button>

      </div>

    </el-dialog>

  </div>

</template>


<script>
  import { getMarketList, getMarketPriceList,savePrice ,updatePrice,getMarketPriceById,exportData} from '@/api/market/everydayprice/index'
  import { getVarietiesList } from '@/api/carpool/carpool'

  export default {

    data() {

      return {

        // 遮罩层

        loading: true,

        // 选中数组

        ids: [],
        varietiesOptions: [],

        marketOptions: [],
        // 非单个禁用

        single: true,

        // 非多个禁用

        multiple: true,

        // 总条数

        total: 0,

        // 市场报价表格数据

        dayList: [],

        // 弹出层标题

        title: '',

        // 是否显示弹出层

        open: false,

        // 查询参数
        // 日期范围
        dateRange: [],
        queryParams: {

          pageNum: 1,

          pageSize: 10
        },

        // 表单参数

        form: {},

        // 表单校验

        rules: {
          marketId: [
            { required: true, message: '请选择市场', trigger: 'blur' }
          ],
          varietiesId: [
            { required: true, message: '请选择品种', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '金额不能为空', trigger: 'blur' }
          ],
          offerDate: [
            { required: true, message: '报价日期不能为空', trigger: 'blur' }
          ]
        }
      }
    },

    created() {

      this.getList()
      this.getVarieties()
      this.getMarket()
    },

    methods: {

      /** 查询市场报价列表 */

      getList() {

        this.loading = true

        getMarketPriceList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {

          this.dayList = response.result.list

          this.total = response.result.total

          this.loading = false

        })

      },
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
      // 取消按钮

      cancel() {

        this.open = false

        this.reset()

      },

      // 表单重置

      reset() {
        this.form = {
          id: null,
          marketId: null,
          price: null,
          varietiesId: null,
          offerDate: null
        }
        this.resetForm('form')
      },

      /** 搜索按钮操作 */

      handleQuery() {
        // this.dateRange = []
        // this.queryParams.pageNum = 1

        this.getList()

      },

      /** 重置按钮操作 */

      resetQuery() {

        this.resetForm('queryForm')

        this.handleQuery()

      },

      // 多选框选中数据

      handleSelectionChange(selection) {

        this.ids = selection.map(item => item.id)

        this.single = selection.length != 1

        this.multiple = !selection.length

      },

      /** 新增按钮操作 */

      handleAdd() {

        this.reset()

        this.open = true

        this.title = '添加市场报价'

      },

      /** 修改按钮操作 */

      handleUpdate(row) {
        this.reset()
        const id = row.id || this.ids

        getMarketPriceById(id).then(response => {
          this.form = response.result
          this.open = true
          this.title = '修改市场报价'
        })
      },

      /** 提交按钮 */

      submitForm: function() {

        this.$refs['form'].validate(valid => {

          if (valid) {

            if (this.form.id != null) {
              updatePrice(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.msg)
                }
              })
            } else {
              savePrice(this.form).then(response => {
                if (response.code === 200) {

                  this.msgSuccess('新增成功')

                  this.open = false

                  this.getList()

                } else {
                  this.msgError(response.msg)
                }
              })
            }
          }
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认根据查询条件导出数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportData(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      }
    }
  }

</script>
