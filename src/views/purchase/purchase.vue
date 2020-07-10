<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
      <el-form-item label="id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="批发市场" prop="marketAddress">
        <el-input
          v-model="queryParams.marketAddress"
          placeholder="请输入批发市场"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="字典状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
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


      <el-form-item label="期待发货日期">
        <el-date-picker
          v-model="dateRangeP"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="采购数量" prop="num">
        <el-input style="width: 150px"
          type="number"
          v-model="queryParams.minNum"
          placeholder="最小采购数量"
          clearable
          size="small"
        />-
        <el-input style="width: 150px"
          type="number"
          v-model="queryParams.maxNum"
          placeholder="最大采购数量"
          clearable
          size="small"
        />
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
          v-hasPermi="['purchase:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['purchase:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['purchase:remove']"
        >删除
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="purchaseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id"/>
      <!--      <el-table-column label="标题" align="center" prop="title" :show-overflow-tooltip="true"/>-->
      <el-table-column label="收货人姓名" align="center" prop="receiverName" :show-overflow-tooltip="true"/>
      <el-table-column label="收货人电话" align="center" prop="receiverPhone1" width="120"/>
      <el-table-column label="批发市场" align="center" prop="marketAddress" :show-overflow-tooltip="true"/>
      <el-table-column label="收货地址" align="center" prop="addr" :show-overflow-tooltip="true"/>
      <el-table-column label="品种" align="center" prop="varietiesName" :show-overflow-tooltip="true"/>
      <el-table-column label="数量(斤)" align="center" prop="number" :show-overflow-tooltip="true"/>
      <el-table-column label="等级" align="center" prop="productGrade" :show-overflow-tooltip="true"/>
      <el-table-column label="装货方式" align="center" prop="lodingWayName" :show-overflow-tooltip="true"/>
      <el-table-column label="期望时间" align="center" prop="deliveryTime" width="120"/>
      <el-table-column label="最低价格(元)" align="center" prop="priceMin" :show-overflow-tooltip="true"/>
      <el-table-column label="最高价格(元)" align="center" prop="priceMax" :show-overflow-tooltip="true"/>
      <el-table-column label="创建时间" align="center" prop="created" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['purchase:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status!=4"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['purchase:remove']"
          >删除
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status==4"
            type="text"
            icon="el-icon-refresh-right"
            @click="purchaseRestore(scope.row) "
            v-hasPermi="['purchase:remove']"
          >还原
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

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title1" :visible.sync="open" width="700px">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" maxlength="50" show-word-limit/>
        </el-form-item>
        <el-form-item label="接货人" prop="receiverName">
          <el-input v-model="form.receiverName" placeholder="请输入接货人"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="receiverPhone1">
          <el-input v-model="form.receiverPhone1" placeholder="请输入手机号码" maxlength="11"/>
        </el-form-item>
        <el-form-item label="接货地址" prop="province">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="receiveAddressDetail">
          <el-input v-model="form.receiveAddressDetail" placeholder="请输入详细地址" maxlength="50"/>
        </el-form-item>
        <el-form-item label="批发市场" prop="marketAddress">
          <el-input v-model="form.marketAddress" placeholder="请输入批发市场"/>
        </el-form-item>
        <el-form-item label="采购品种" prop="varietiesName">
          <el-select
            v-model="form.varietiesName"
            placeholder="采购品种"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in varietiesOptions"
              :key="dict.name"
              :label="dict.name"
              :value="dict.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="属性" prop="attr">
          <el-select
            v-model="form.attWeight"
            placeholder="大小"
            clearable
            size="small"
            style="width:100px"
          >
            <el-option
              v-for="dict in attWeightOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              :value="dict.dictValue"
            />
          </el-select>
          <el-select
            v-model="form.attFruit"
            placeholder="尺寸"
            clearable
            size="small"
            style="width: 100px"
          >
            <el-option
              v-for="dict in attFruitOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              :value="dict.dictValue"
            />
          </el-select>
          <el-select
            v-model="form.attColors"
            placeholder="颜色"
            clearable
            size="small"
            style="width: 100px"
          >
            <el-option
              v-for="dict in attColorsOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              :value="dict.dictValue"
            />
          </el-select>
          <el-select
            v-model="form.attRipe"
            placeholder="成熟度"
            clearable
            size="small"
            style="width: 100px"
          >
            <el-option
              v-for="dict in attRipeOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="采购数量/斤" prop="number">
          <el-input-number v-model="form.number" placeholder="请输入采购数量"/>
        </el-form-item>
        <el-form-item label="装货方式" prop="lodingWay">
          <el-select
            v-model="form.lodingWay"
            placeholder="装货方式"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in laodingWayOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="期望发货时间" prop="deliveryTime">
          <el-date-picker
            v-model="form.deliveryTime"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="expireTimeOption"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期望价格范围(元)" prop="price">
          <el-input-number v-model="form.priceMin" :min="0" placeholder="最低价格"/>
          -
          <el-input-number v-model="form.priceMax" :min="form.priceMin" placeholder="最高价格"/>
        </el-form-item>

        <el-form-item label="展示时间段">
          <el-date-picker prop="showTimeStart"
            v-model="form.showTimeStart"
            type="date"
             :clearable="false"
            value-format="yyyy-MM-dd"
            :picker-options="expireTimeOption"
            placeholder="选择开始日期">
          </el-date-picker>
          -
          <el-date-picker prop="showTimeEnd"
            v-model="form.showTimeEnd"
            type="date"
            :clearable="false"
            value-format="yyyy-MM-dd"
            :picker-options="expireTimeOption"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="品质说明要求" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入品质说明要求" maxlength="100" show-word-limit/>
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
  import { getVarietiesList } from '@/api/carpool/carpool'
  import {
    addPurchase,
    deletePurchase,
    getPurchaseById,
    listPurchase,
    restorePurchase,
    updatePurchase
  } from '@/api/purchase/purchase'
  import VDistpicker from 'v-distpicker'

  export default {
    name: 'Purchase',
    components: { VDistpicker },
    data() {
      return {
        expireTimeOption: {
          disabledDate(date) {
            return date.getTime() < Date.now()-1000*60*60*24
          }
        },

        temp: {
          address__province: '广东省',
          address__city: '湛江市',
          address__dist: '徐闻县'
        },
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
        sta: '',
        end: '',
        // 字典表格数据
        purchaseList: [],
        // 弹出层标题
        title1: '',
        // 是否显示弹出层
        open: false,
        // 状态数据字典
        laodingWayOptions: [],
        statusOptions: [],
        varietiesOptions: [],
        attWeightOptions: [],
        attFruitOptions: [],
        attColorsOptions: [],
        attRipeOptions: [],
        // 日期范围
        dateRange: [],
        dateRangeP: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          marketAddress: null
        },

        // 表单参数
        form: {
          attWeight:'',
          attFruit:'',
          attColors:'',
          attRipe:''
        },
        // 表单校验
        rules: {
          receiverName: [
            { required: true, message: '收货人姓名不能为空', trigger: 'blur' }
          ],
          receiverPhone1: [
            {
              required: true,
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ],
          number: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          lodingWay: [
            { required: true, message: '装货方式不能为空', trigger: 'blur' }
          ],
          deliveryTime: [
            { required: true, message: '期望时间不能为空', trigger: 'blur' }
          ],
          priceMin: [
            { required: true, message: '最低价格不能为空', trigger: 'blur' }
          ],
          showTimeStart: [
            { required: true, message: '开始时间不能为空', trigger: 'blur' }
          ],
          showTimeEnd: [
            { required: true, message: '结束时间不能为空', trigger: 'blur' }
          ],
          priceMax: [
            { required: true, message: '最高价格不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          receiveAddressDetail: [
            { required: true, message: '收货详细地址不能为空', trigger: 'blur' }
          ],
          varietiesName: [
            { required: true, message: '采购品种不能为空', trigger: 'blur' }
          ],
          attWeight: [
            { required: true, message: '属性大小不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {

      this.getList()
      this.getDicts('laoding_way').then(response => {
        this.laodingWayOptions = response.data
      })
      this.getVarieties()
      this.getDicts('purchase_status').then(response => {
        this.statusOptions = response.data
      })
      this.getDicts('varieties_att_weight').then(response => {
        this.attWeightOptions = response.data
      })
      this.getDicts('varieties_att_fruit').then(response => {
        this.attFruitOptions = response.data
      })
      this.getDicts('varieties_att_colors').then(response => {
        this.attColorsOptions = response.data
      })
      this.getDicts('varieties_att_ripe').then(response => {
        this.attRipeOptions = response.data
      })
    },
    methods: {
      /** 查询orderManager列表 */
      addDateRangeByType(params, dateRange,type) {
        var search = params;

        if (null != dateRange && '' != dateRange) {

          if (type == 1){
            search.beginTime = "";
            search.endTime = "";
            search.beginTime = dateRange[0];
            search.endTime =dateRange[1];
          }else if (type == 2){
            search.deliveryTime = "";

            search.deliveryTime = dateRange[0];


          }else{
            search.sendBeginTime = "";
            search.sendEndTime = "";
            search.sendBeginTime = dateRange[0];
            search.sendEndTime = dateRange[1];
          }

        }
        return search;
      },
      /** 查询字典类型列表 */
      getList() {
        this.loading = true
        let addDateRange = this.addDateRangeByType(this.queryParams, this.dateRange,1);
         addDateRange = this.addDateRangeByType(this.queryParams, this.dateRangeP,2);
        listPurchase(addDateRange).then(response => {
            this.purchaseList = response.result.list
            this.total = response.result.total
            this.loading = false
          }
        )
      },

      //品种选择
      getVarieties() {
        getVarietiesList().then(response => {
          this.varietiesOptions = response.result
        })
      },

      // 字典状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.temp = {
          address__province: '广东省',
          address__city: '湛江市',
          address__dist: '徐闻县'
        },
          this.form = {
            minNum:null,
            maxNum:null,
            marketAddress: null,
            status: '4',
            attWeight:'',
            attFruit:'',
            attColors:'',
            attRipe:'',
            showTimeStart : new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 1),
            showTimeEnd : new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 7)
          }

        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = []
        this.dateRangeP = []
        this.resetForm('queryForm')
        this.handleQuery()
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title1 = '添加采购'
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const id = row.id || this.ids
        getPurchaseById(id).then(response => {
          this.form = response.result
          this.form.lodingWay = response.result.lodingWay.toString()
          if (response.result.receiveAddress != null || response.result.receiveAddress != '') {
            const list = response.result.receiveAddress.split(' ')
            this.temp.address__province = list[0]
            this.temp.address__city = list[1]
            this.temp.address__dist = list[2]
          }
          this.open = true
          this.title1 = '修改采购'
        })
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if(this.temp.address__province=='省'){
              this.msgError('请选择省份')
              return;
            }
            if(this.temp.address__city=='市'){
              this.msgError('请选择市')
              return;
            }
            if(this.temp.address__dist=='区'){
              this.msgError('请选择区')
              return;
            }
            this.form.receiveAddress = this.temp.address__province + ' ' + this.temp.address__city + ' ' + this.temp.address__dist
            if(this.form.attWeight==null||this.form.attWeight==''||this.form.attWeight==undefined){
              this.msgError('属性大小不能为空')
              return;
            }
            if(this.form.showTimeStart==null||this.form.showTimeStart==''||this.form.showTimeStart==undefined){
              this.msgError('开始展示时间不能为空')
              return;
            }
            if(this.form.showTimeEnd==null||this.form.showTimeEnd==''||this.form.showTimeEnd==undefined){
              this.msgError('结束时间不能为空')
              return;
            }
            if (this.form.id != null) {
              updatePurchase(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.msg)
                }
              })
            } else {
              addPurchase(this.form).then(response => {
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

      /** 还原按钮操作 */
      purchaseRestore(row) {
        const id = row.id
        this.$confirm('是否确认还原编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return restorePurchase(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('还原成功')
        }).catch(function() {
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const id = row.id || this.ids
        this.$confirm('是否确认删除编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return deletePurchase(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
      },
      onSelected(data) {
        this.temp.address__province = data.province.value
        this.temp.address__city = data.city.value
        this.temp.address__dist = data.area.value
      }
    }
  }
</script>
