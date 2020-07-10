<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="拼车编码" prop="carpoolCode">
        <el-input
          v-model="queryParams.carpoolCode"
          placeholder="请输入拼车编码"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--      <el-col :span="1.5">-->
      <!--                <el-button-->
      <!--                  type="primary"-->
      <!--                  icon="el-icon-plus"-->
      <!--                  size="mini"-->
      <!--                  @click="handlePartake"-->
      <!--                  v-hasPermi="['carpool:add']"-->
      <!--                >参与拼车-->
      <!--                </el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-truck"
          size="mini"
          @click="addCarpoolInfo"
          v-hasPermi="['carpool:add']"
        >添加装车信息
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['carpool:remove']"
        >删除
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="carpoolList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="checkboxT" align="center"/>
      <el-table-column label="id" align="center" width="50" prop="id"/>
      <el-table-column label="拼车编码" align="center" prop="carpoolCode" width="170px"/>
      <el-table-column label="接货人" align="center" prop="receiverName" width="150px"/>
      <el-table-column label="手机号码" align="center" prop="receiverPhone1" width="150"/>
      <el-table-column label="收货地址" align="center" prop="receiveAddress" width="150" :show-overflow-tooltip="true"/>
      <el-table-column label="拼车品种" align="center" prop="itemName" :show-overflow-tooltip="true"/>
      <el-table-column label="数量 (占比)" align="center" prop="count" width="80px" :formatter="countFormat"/>
      <el-table-column label="总价（单位：元）" align="center" prop="amounts" width="150"/>
      <el-table-column label="定金（单位：元）" align="center" prop="earnestMoney" width="150" :formatter="numFilter1"/>
      <el-table-column label="尾款（单位：元）" align="center" prop="tailMoney" width="150" :formatter="numFilter2"/>
      <el-table-column label="付款状态" align="center" prop="statusName" width="100"/>
      <el-table-column label="是否装车" align="center" prop="loadingName" width="80"/>
      <el-table-column label="期望发货时间" align="center" prop="deliveryTime" width="100"/>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true"/>
      <el-table-column label="拼车状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="拼车方式" align="center" prop="carpoolWay" :formatter="carpoolWayFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status <7"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['carpool:edit']"
          >修改
          </el-button>

          <el-button
            v-if="scope.row.isLoading"
            size="mini"
            type="text"
            icon="el-icon-truck"
            @click="updateCarpoolInfo(scope.row)"
            v-hasPermi="['carpool:edit']"
          >货车信息修改
          </el-button>

          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-success"
            @click="handlePass(scope.row)"
            v-hasPermi="['carpool:pass']"
          >审核通过
          </el-button>
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-error"
            @click="handleFail(scope.row)"
            v-hasPermi="['carpool:fail']"
          >审核不通过
          </el-button>
          <el-button
            v-if="scope.row.status == 4 "
            size="mini"
            type="text"
            icon="el-icon-coin"
            @click="handleSettingPrice(scope.row)"
            v-hasPermi="['carpool:fail']"
          >设置金额
          </el-button>
          <el-button
            v-if="scope.row.status ==5"
            size="mini"
            type="text"
            icon="el-icon-money"
            @click="handlePayMoney(scope.row)"
            v-hasPermi="['carpool:partake']"
          >付定金
          </el-button>
          <el-button
            v-if="scope.row.status ==6"
            size="mini"
            type="text"
            icon="el-icon-bank-card"
            @click="handlePayAll(scope.row)"
            v-hasPermi="['carpool:partake']"
          >付尾款
          </el-button>
          <el-button
            v-if="scope.row.status ==7"
            size="mini"
            type="text"
            icon="el-icon-check"
            @click="handlePayFinish(scope.row)"
            v-hasPermi="['carpool:partake']"
          >交易完成
          </el-button>

          <el-button
            v-if="scope.row.status ==2&&scope.row.carpoolWay!=2"
            size="mini"
            type="text"
            icon="el-icon-s-custom"
            @click="handlePartake(scope.row)"
            v-hasPermi="['carpool:partake']"
          >参与拼团
          </el-button>
          <el-button
            v-if="scope.row.status ==2&&scope.row.carpoolWay !=2"
            size="mini"
            type="text"
            icon="el-icon-circle-check"
            @click="handleSuccessful(scope.row)"
            v-hasPermi="['carpool:success']"
          >拼团成功
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      @pagination="getList"
    />

    <!-- 添加车辆信息窗口 -->
    <el-dialog :title="title3" :visible.sync="open3" width="600px">
      <el-form ref="form3" :model="form3" :rules="rules3" label-width="110px">
        <el-form-item label="司机姓名" prop="driverName">
          <el-input v-model="form3.driverName" placeholder="请输入司机姓名" maxlength="10"/>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form3.phone" placeholder="请输入手机号码" maxlength="11"/>
        </el-form-item>

        <el-form-item label="车牌型号" prop="carType">
          <el-input v-model="form3.carType" placeholder="请输入车牌型号" maxlength="20"/>
        </el-form-item>
        <el-form-item label="车牌号码" prop="carPlate">
          <el-input v-model="form3.carPlate" placeholder="请输入车牌号码" maxlength="20"/>
        </el-form-item>
        <el-form-item label="运输保险单号" prop="policyNo">
          <el-input v-model="form3.policyNo" placeholder="请输入运输保险单号" maxlength="30"/>
        </el-form-item>

        <el-form-item label="装货图片" prop="resources">
          <el-upload  ref="my-upload"
            :action="uploadImgUrl"
            list-type="picture-card"
            v-model="form3.resources"
            :limit=num
            :on-preview="handlePictureCardPreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove">
            <img v-if="vis" :src="form3.resources" :alt="form3.resources" style="height: 145px;width: 143px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm3">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 设置价格窗口 -->
    <el-dialog :title="title2" :visible.sync="open2" width="600px">
      <el-form ref="form2" :model="form2" :rules="rules" label-width="80px">
        <el-form-item label="拼车id" prop="id">
          <el-input v-model="form2.id" placeholder="拼车id" readonly="readonly" style="width: 180px;"/>
        </el-form-item>

        <el-form-item label="总价" prop="price">
          <el-input-number v-model="form2.price" placeholder="请输入总价"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title1" :visible.sync="open"  width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"  maxlength="20"  show-word-limit/>
        </el-form-item>
        <el-form-item label="接货人" prop="receiverName">
          <el-input v-model="form.receiverName" placeholder="请输入接货人" maxlength="10" />
        </el-form-item>
        <el-form-item label="手机号码" prop="receiverPhone1" >
          <el-input v-model="form.receiverPhone1" placeholder="请输入手机号码" maxlength="11" />
        </el-form-item>
        <el-form-item label="接货地址" prop="province">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="receiveAddressDetail">
          <el-input v-model="form.receiveAddressDetail" placeholder="请输入详细地址" maxlength="20"  show-word-limit/>
        </el-form-item>
        <el-form-item label="批发市场" prop="marketAddress">
          <el-input v-model="form.marketAddress" placeholder="请输入批发市场"/>
        </el-form-item>
        <el-form-item label="品种" prop="varietiesName">
          <el-select
            v-model="form.varietiesName"
            placeholder="品种"
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

        <el-form-item label="等级" prop="attr">
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

        <el-form-item label="拼车数量" prop="number">
          <el-input-number v-model="form.number" placeholder="请输入采购数量"/>
        </el-form-item>

        <el-form-item label="期望发货时间" prop="deliveryTime">
          <el-date-picker
            v-model="form.deliveryTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="品质说明要求" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入品质说明要求" maxlength="200"  show-word-limit/>
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
  import {
    addCarpool,
    carpoolFinish,
    carpoolInfo,
    carpoolInfoDetail,
    carpoolPayAll,
    carpoolPayMoney,
    carpoolPrice,
    carpoolUserPrice,
    deleteCarpool,
    failCarpool,
    getCarpoolDetail,
    listCarpoolDetail,
    passCarpool,
    susCarpool,
    updateCarpool,
    getVarietiesList
  } from '@/api/carpool/carpool'
  import VDistpicker from 'v-distpicker'

  export default {
    components: {VDistpicker},
    name: 'CarpoolDetail',
    data() {
      return {
        temp: {
          address__province: '广东省',
          address__city: '湛江市',
          address__dist: '徐闻县',
        },
        num: 1,
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        flag: 1,
        vis: false,
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 上传的图片服务器地址
        uploadImgUrl: process.env.VUE_APP_BASE_API + '/image/imageUpload',
        // 字典表格数据
        carpoolList: [],
        // 弹出层标题
        title1: '',
        title2: '',
        title3: '',
        // 是否显示弹出层
        open: false,
        open2: false,
        open3: false,
        // 状态数据字典
        carpoolWayOptions: [],
        laodingWayOptions:[],
        varietiesOptions:[],
        statusOptions: [],
        attWeightOptions: [],
        attFruitOptions: [],
        attColorsOptions: [],
        attRipeOptions: [],

        // 日期范围
        dateRange: [],
        // 查询参数
        queryParams: {
          carpoolCode: null,
          id: null
        },
        // 表单参数
        form: { },
        form2: {  },

        form3: {
          carpoolCode: null,
        },
        // 表单校验
        rules3: {
          driverName: [
            { required: true, message: '司机姓名不能为空', trigger: 'blur' }
          ],
          carPlate: [
            { required: true, message: '车牌号码不能为空', trigger: 'blur' }
          ],
          carType: [
            { required: true, message: '车牌型号不能为空', trigger: 'blur' }
          ],
          phone: [
            {  required: true,
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur' }
          ],
          policyNo: [
            { required: true, message: '运输保险单号不能为空', trigger: 'blur' }
          ]
        },

        rules: {
          receiverName: [
            { required: true, message: '收货人不能为空', trigger: 'blur' }
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
            { required: true, message: '采购数量不能为空', trigger: 'blur' }
          ],
          lodingWay: [
            { required: true, message: '装载方式不能为空', trigger: 'blur' }
          ],
          deliveryTime: [
            { required: true, message: '期望发货时间不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          receiveAddressDetail: [
            { required: true, message: '收货详细地址不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      const strCarpoolCode = this.$route.params && this.$route.params.strCarpoolCode
      this.queryParams.carpoolCode = strCarpoolCode
      this.getList()
      this.getVarieties();
      this.getDicts('carpool_status').then(response => {
        this.statusOptions = response.data
      })
      this.getDicts('carpool_way').then(response => {
        this.carpoolWayOptions = response.data
      })
      this.getDicts("laoding_way").then(response => {
        this.laodingWayOptions = response.data;
      });
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
      /** 查询活动列表 */
      getList() {
        this.loading = true
        listCarpoolDetail(this.queryParams).then(response => {
            this.carpoolList = response.result
            this.loading = false
          }
        )
      },
      //品种选择
      getVarieties(){
        getVarietiesList().then(response => {
          this.varietiesOptions = response.result;
        });
      },
      // 字典状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      checkboxT(row, rowIndex) {
        if (row.status > 8) {
          return false
        }
        if (row.isLoading) {
          return false//禁用
        } else {
          return true//不禁用
        }
      },
      // 字典状态字典翻译
      countFormat(row, column) {
        if (row.status == 9 || row.status == 1 || row.status == 3 || row.status == 10) {
          return '-'
        }
        const num = parseFloat(row.count)
        const total = parseFloat(row.totalCount)
        if (isNaN(num) || isNaN(total)) {
          return '-'
        }
        return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%'
      },
      //保留两位小数
      numFilter1(row, column) {
        let realVal = ''
        if (!isNaN(row.earnestMoney) && row.earnestMoney !== '') {
          // 截取当前数据到小数点后两位
          realVal = parseFloat(row.earnestMoney).toFixed(2)
        } else {
          realVal = '--'
        }
        return realVal
      },
      //保留两位小数
      numFilter2(row, column) {
        let realVal = ''
        if (!isNaN(row.tailMoney) && row.tailMoney !== '') {
          // 截取当前数据到小数点后两位
          realVal = parseFloat(row.tailMoney).toFixed(2)
        } else {
          realVal = '--'
        }
        return realVal
      },

      // 字典状态字典翻译
      carpoolWayFormat(row, column) {
        return this.selectDictLabel(this.carpoolWayOptions, row.carpoolWay)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.open2 = false
        this.open3 = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          carpoolCode: null,
          marketAddress: null,
          carpoolWay: null,
          status: null,
          attWeight: '',
          attFruit: '',
          attColors: '',
          attRipe: '',
        },
        this.temp= {
          address__province: '广东省',
          address__city: '湛江市',
          address__dist: '徐闻县',
        },
        this.form2 = {
        }
        this.form3 = {
          id:null
        }
        this.resetForm('form')
        this.resetForm('form2')
        this.resetForm('form3')
        if (this.flag == 2) {
          this.$refs['my-upload'].clearFiles()
        }
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = []
        this.resetForm('queryForm')
        this.handleQuery()
      },
      /** 拼车单-输入车辆信息按钮操作 */
      addCarpoolInfo() {
        this.reset()
        this.vis = false
        if (this.ids == undefined || this.ids == null || this.ids == '') {
          this.msgSuccess('请勾选拼车单号')
        } else {
          this.form3.carpoolCode = this.queryParams.carpoolCode
          this.open3 = true
          this.title3 = '添加拼车车辆信息'
        }
      },

      /** 参与拼车按钮操作 */
      handlePartake(row) {
        this.reset()
        this.form.carpoolCode =this.queryParams.carpoolCode
        this.form.carpoolWay = 2
        this.open = true
        this.title1 = '参与拼车订单'
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
        this.vis = true
        const id = row.id || this.ids
        getCarpoolDetail(id).then(response => {
          this.form = response.result
          this.form.carpoolCode=this.queryParams.carpoolCode
          this.form.lodingWay=response.result.lodingWay.toString();
          this.open = true
          this.title1 = '修改拼车单'
        })
      },
      /** 修改货车信息按钮操作 */
      updateCarpoolInfo(row) {
        this.reset()
        this.queryParams.id = row.id
        this.vis = true
        carpoolInfoDetail(this.queryParams).then(response => {
          this.form3 = response.result
          this.open3 = true
          this.title3 = '修改货车信息'
        })
      },

      /** 设置价格按钮操作 */
      handleSettingPrice(row) {
        this.reset()
        this.form2.id = row.id
        this.open2 = true
        this.title2 = '设置价格'
      },

      /** 提交设置价格按钮 */
      submitForm2: function() {
        this.$refs['form2'].validate(valid => {
          if (valid) {
            if (this.form2.id != null) {
              carpoolUserPrice(this.form2).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('设置成功')
                  this.open2 = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            }
          }
        })
      },

      /** 提交货车信息按钮 */
      submitForm3: function() {
        this.$refs['form3'].validate(valid => {
          if (valid) {
            this.form3.carpoolCode=this.queryParams.carpoolCode
            if (this.form3.id != null) {
              carpoolInfo(this.form3).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open3 = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            } else {
              this.form3.ids = this.ids
              carpoolInfo(this.form3).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('新增成功')
                  this.open3 = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            }
          }
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
            if(this.form.attWeight==null||this.form.attWeight==''||this.form.attWeight==undefined){
              this.msgError('属性大小不能为空')
              return;
            }
              this.form.receiveAddress = this.temp.address__province +" "+ this.temp.address__city +" "+ this.temp.address__dist
              if (this.form.id != null) {
              updateCarpool(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            } else {
              addCarpool(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('新增成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            }
          }
        })
      },
      /** 通过按钮操作 */
      handlePass(row) {
        const id = row.id
        this.$confirm('是否确认审核通过编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return passCarpool(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核通过')
        }).catch(function(e) {
          this.msgError(e)
        })
      },
      /** 不通过按钮操作 */
      handleFail(row) {
        const id = row.id
        this.$confirm('是否确认审核不通过编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return failCarpool(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核不通过')
        }).catch(function() {
        })
      },
      /** 付定金按钮操作 */
      handlePayMoney(row) {
        const id = row.id
        this.$confirm('是否确认付定金编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return carpoolPayMoney(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('付定金成功')
        }).catch(function() {
        })
      },
      /** 付尾款按钮操作 */
      handlePayAll(row) {
        const id = row.id
        this.$confirm('是否确认付尾款编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return carpoolPayAll(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('付尾款成功')
        }).catch(function() {
        })
      },

      /** 交易完成按钮操作 */
      handlePayFinish(row) {
        const id = row.id
        this.$confirm('是否确认交易完成编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return carpoolFinish(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('交易完成')
        }).catch(function() {
        })
      },

      /** 拼团成功按钮操作 */
      handleSuccessful(row) {
        const id = row.carpoolCode + ''
        this.$confirm('是否确认拼团成功编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return susCarpool(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('拼团成功')
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
          return deleteCarpool(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
      },
      handleRemove(file, fileList) {
        this.form3.resources = null
      },
      handlePictureCardPreview(file) {
        this.form3.resources = file.result
      },
      handleSuccess(file) {
        this.form3.resources = file.result
        this.vis = false
        this.flag = 2
      },
      onSelected(data) {
        this.temp.address__province = data.province.value
        this.temp.address__city = data.city.value
        this.temp.address__dist = data.area.value
        this.form.receiveAddress = this.temp.address__province +" "+ this.temp.address__city +" "+ this.temp.address__dist
      }
    }
  }
</script>
