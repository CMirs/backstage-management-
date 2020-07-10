<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="90px">
      <el-form-item label="订单id" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收件人手机" prop="buyerIphone">
        <el-input
          v-model="queryParams.buyerIphone"
          placeholder="请输入收件人手机"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物流单号" prop="shippingCode">
        <el-input
          v-model="queryParams.shippingCode"
          placeholder="请输入物流单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择交易状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <!--      <el-form-item label="订单状态" prop="orderStatus">-->
      <!--        <el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态" clearable size="small">-->
      <!--          <el-option-->
      <!--            v-for="dict in orderStatusOptions"-->
      <!--            :key="dict.dictValue"-->
      <!--            :label="dict.dictLabel"-->
      <!--            :value="dict.dictValue"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->


      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRangeC"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="付款时间">
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

      <el-form-item label="发货时间">
        <el-date-picker
          v-model="dateRangeCT"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="买家昵称" prop="buyerNick">
        <el-input
          v-model="queryParams.buyerNick"
          placeholder="请输入买家昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
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
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['order:order:export']"
        >导出
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          v-hasPermi="['order:order:import']"
        >批量发货
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-plus"
          size="mini"
          @click="handleQuery2('1')"
          v-hasPermi="['order:order:pending']"
        >待发货({{dfh}})
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-plus"
          size="mini"
          @click="handleQuery2('2')"
          v-hasPermi="['order:order:wating']"
        >待收货({{dsh}})
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-plus"
          size="mini"
          @click="handleQuery3"
          v-hasPermi="['order:order:get']"
        >已收货({{ysh}})
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-plus"
          size="mini"
          @click="handleQuery2('7')"
          v-hasPermi="['order:order:backSuccess']"
        >退款成功({{tkc}})
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-plus"
          size="mini"
          @click="handleQuery2('8')"
          v-hasPermi="['order:order:backFail']"
        >退款失败({{tks}})
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-plus"
          size="mini"
          @click="handleQuery2('6')"
          v-hasPermi="['order:order:ready']"
        >待退款({{tkz}})
        </el-button>
      </el-col>

    </el-row>

    <div v-for="item in orderList" class="order-list">
      <div class="order-code">
        <div>订单编号:

          <router-link :to="'/product/order/detail/'+item.orderId" class="link-type">
            <span>{{item.orderId}} </span>
          </router-link>

        </div>
        <div>创建时间:{{ item.createTime !=null ? parseTime(item.createTime) : item.createTime }}</div>
        <div>付款时间:{{ item.paymentTime !=null ? parseTime(item.paymentTime) : item.paymentTime }}</div>
        <div>发货时间:{{ item.consignTime !=null ? parseTime(item.consignTime) : item.consignTime }}</div>
      </div>

      <el-table v-loading="loading" :data="item.itemList" border @selection-change="handleSelectionChange"
                :span-method="objectSpanMethod">
        <!--        <el-table-column type="selection"  align="center" />-->
        <el-table-column label="商品图片" align="center" prop="picPath">
          <template slot-scope="scope">
            <img slot="reference" :src="scope.row.picPath" :alt="scope.row.picPath"
                 style="max-height: 50px;max-width: 130px">
          </template>
        </el-table-column>

        <el-table-column label="商品标题" align="center" prop="title" :show-overflow-tooltip="true"/>
        <el-table-column label="商品规格" align="center" prop="sizeName"/>
        <el-table-column label="购买数量" align="center" prop="num"/>
        <el-table-column label="商品单价" align="center" prop="price"/>
        <el-table-column label="商品总金额" align="center" prop="totalFee"/>
        <el-table-column label="实付金额(元)" align="center" prop="payment"/>
        <el-table-column label="订单状态" align="center" prop="status" :formatter="statusFormat"/>
        <el-table-column label="支付渠道" align="center" prop="payWay" :formatter="payWayFormat"/>
        <!--<el-table-column label="支付类型" align="center" prop="paymentType" :formatter="paymentTypeFormat"/>-->
        <!--<el-table-column label="邮费" align="center" prop="postFee"/>-->
        <el-table-column label="买家昵称" align="center" prop="buyerNick"/>
        <el-table-column label="买家留言" align="center" prop="buyerMessage" :show-overflow-tooltip="true"/>
        <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true"/>
        <el-table-column label="操作" align="center" prop="status">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status ==2 || scope.row.status== 3|| scope.row.status== 4|| scope.row.status== 6|| scope.row.status== 7|| scope.row.status== 8"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="linkDownload(scope.row.shippingCode)"
              v-hasPermi="['order:order:logistics']"
            >查看物流
            </el-button>
            <el-button
              v-if="scope.row.status ==6||scope.row.status ==7||scope.row.status ==8"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="refund(scope.row)"
              v-hasPermi="['order:order:refund']"
            >退款操作
            </el-button>
            <el-button
              v-if="scope.row.status ==7"
              size="mini"
              type="text"
              icon="el-icon-info"
              @click="refundInfo(scope.row)"
              v-hasPermi="['order:order:message']"
            >退款信息
            </el-button>
            <el-button
              v-if="scope.row.status ==1"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="orderAddress(scope.row)"
              v-hasPermi="['order:order:address']"
            >修改收货信息
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="orderRemark(scope.row)"
              v-hasPermi="['order:order:remark']"
            >添加备注
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 退款操作-->
    <el-dialog :title="title2" :visible.sync="open2" width="700px">
      <el-form ref="form2" :model="form2" label-width="120px">
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="form2.orderId" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="申请时间" prop="created">
          <el-date-picker
            v-model="form2.created"
            type="datetime"
            readonly="readonly"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="支付金额(元)" prop="payment">
          <el-input v-model="form2.payment" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="邮费(元)" prop="postFee">
          <el-input v-model="form2.postFee" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="退款图片" prop="image">

          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="form2.image"
              :preview-src-list="form2.images">
            </el-image>
          </div>
        </el-form-item>


        <el-form-item label="退款原因" prop="reason">
          <el-input type="textarea" v-model="form2.reason" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="拒绝退款原因" prop="remark">
          <el-input type="textarea" v-model="form2.remark" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="退款类型" prop="status">
          <el-radio-group v-model="form2.status" disabled>
            <el-radio label=1>退款退货</el-radio>
            <el-radio label=2>仅退款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="已退金额(元)" prop="refundFee1">
          <el-input v-model="form2.refundFee1" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="退款金额(元)" prop="refundFee" v-show=refundFlag>
          <el-input-number v-model="form2.refundFee"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show=refundFlag>
        <el-button type="success" @click="agree">同意退款</el-button>
        <el-button type="danger" @click="notAgree">拒绝退款</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 备注操作-->
    <el-dialog :title="title4" :visible.sync="open4" width="700px">
      <el-form ref="form4" :model="form4" label-width="120px">
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="form4.orderId" readonly="readonly"/>
        </el-form-item>

        <el-form-item label="备注" prop="remark" :rules="{
            required: true, message: '备注不能为空', trigger: 'blur'
        }">
          <el-input type="textarea" v-model="form4.remark"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateRemark">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 修改订单地址 -->
    <el-dialog :title="title3" :visible.sync="open3" width="700px">
      <el-form ref="form3" :model="form3" label-width="120px">
        <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="form3.orderId" readonly="readonly"/>
        </el-form-item>

        <el-form-item label="收货人姓名" prop="receiverName" :rules="{
            required: true, message: '收货人姓名不能为空', trigger: 'blur'
        }">
          <el-input v-model="form3.receiverName" placeholder="请输入收货人姓名" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="收货人电话" prop="receiverPhone" :rules="{
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码',trigger: 'blur'
        }">
          <el-input v-model="form3.receiverPhone" placeholder="请输入收货人电话" maxlength="20" show-word-limit/>
        </el-form-item>

        <el-form-item label="收货地址" prop="province">
          <v-distpicker :province="form3.receiverState" :city="form3.receiverCity" :area="form3.receiverDistrict"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="收货详细地址" prop="receiverAddress" :rules="{
            required: true, message: '收货详细地址不能为空', trigger: 'blur'
        }">
          <el-input v-model="form3.receiverAddress" placeholder="请输入供货详细地址" maxlength="30" show-word-limit/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateAddress">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 添加或修改orderManager对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物流名称" prop="shippingName">
          <el-input v-model="form.shippingName" placeholder="请输入物流名称"/>
        </el-form-item>
        <el-form-item label="物流单号" prop="shippingCode">
          <el-input v-model="form.shippingCode" placeholder="请输入物流单号"/>
        </el-form-item>
        <!--        <el-form-item label="快递鸟提供快递公司编号" prop="expressComNo">-->
        <!--          <el-input v-model="form.expressComNo" placeholder="请输入快递鸟提供快递公司编号" />-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 导入快递单号对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">


        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog :visible.sync="kdopen" custom-class="logistic">

      <iframe style="width: 1450px;height: 850px" :src="src"></iframe>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelKd">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addOrder,
    agreeRefund,
    delOrder,
    exportOrder2,
    getOrder,
    listOrder,
    notAgreeRefund,
    orderCountByStatus,
    orderEditAddress,
    orderEditRemark,
    orderShippingById,
    refundOrderById,
    updateOrder
  } from '@/api/product/order/order'
  import { getToken } from '@/utils/auth'
  import VDistpicker from 'v-distpicker'

  export default {
    name: 'Order',
    components: { VDistpicker },
    data() {
      return {

        // 用户导入参数
        upload: {
          // 是否显示弹出层（用户导入）
          open: false,
          // 弹出层标题（用户导入）
          title: '',
          // 是否禁用上传
          isUploading: false,

          // 设置上传的请求头部
          headers: { Authorization: 'Bearer ' + getToken() },
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + '/order/importData'
        },

        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        flag: 1,
        dfh: 0,
        dsh: 0,
        ysh: 0,
        tkz: 0,
        tkc: 0,
        tks: 0,
        refundFlag: true,
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // orderManager表格数据
        orderList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        title2: '',
        open2: false,
        title3: '',
        open3: false,
        title4: '',
        open4: false,
        kdopen: false,
        uploadImgUrl: process.env.VUE_APP_BASE_API + '/image/imageUpload', // 上传的图片服务器地址
        src: 'https://www.kuaidi100.com/chaxun?nu=',
        // 支付渠道(ALIPAY_APP : 支付宝APP支付; WXPAY_APP : APP微信支付 ; WXPAY_XCX : 微信小程序支付 ; WEPAY_GZH : 微信公众号支付)字典
        payWayOptions: [],
        // 支付平台(ALIPAY :支付宝 ; WXPAY : 微信)字典
        payPlatformOptions: [],
        // 支付类型 1在线支付 2货到付款字典
        paymentTypeOptions: [],
        // 订单状态  0未付款 1已付款 2等待收货 3交易成功(待评价) 4已评价 5交易关闭 6退款中(卖家未发货,已提交申请(等待运营人员审核)) 7退款成功(交易关闭)字典
        statusOptions: [],
        orderStatusOptions: [],
        // 日期范围
        dateRangeC: [],
        dateRangeP: [],
        dateRangeCT: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          orderId: null,
          buyerIphone: null,
          shippingCode: null,
          status: null,
          orderStatus: null,
          buyerNick: null
        },
        // 表单参数
        form: {},
        form4: {},
        form2: { moreImage: { url: [] } },
        form3: {
          receiverState: '广东省',
          receiverCity: '',
          receiverAddress: ''
        },
        // 表单校验
        rules: {}
      }
    },
    created() {
      this.getList()
      this.getOrderStatusCount()
      this.getDicts('pay_way').then(response => {
        this.payWayOptions = response.data
      })
      this.getDicts('pay_platform').then(response => {
        this.payPlatformOptions = response.data
      })
      this.getDicts('payment_type').then(response => {
        this.paymentTypeOptions = response.data
      })
      this.getDicts('order_status').then(response => {
        this.statusOptions = response.data
      })
      this.getDicts('item_order_status').then(response => {
        this.orderStatusOptions = response.data
      })
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        //当前列号
        if (columnIndex === 7 || columnIndex === 8 || columnIndex === 9 || columnIndex === 11 || columnIndex === 12) {
          //当前行号
          if (rowIndex === 0) {
            return {
              rowspan: row.itemSize,//占几行,有多少条数据就占几行
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      /** 查询orderManager列表 */
      addDateRangeByType(params, dateRange, type) {
        var search = params
        if (type == 1) {
          search.createBeginTime = ''
          search.createEndTime = ''
        } else if (type == 2) {
          search.payBeginTime = ''
          search.payEndTime = ''
        } else {
          search.sendBeginTime = ''
          search.sendEndTime = ''
        }
        if (null != dateRange && '' != dateRange) {
          if (type == 1) {
            search.createBeginTime = dateRange[0]
            search.createEndTime = dateRange[1]
          } else if (type == 2) {
            search.payBeginTime = dateRange[0]
            search.payEndTime = dateRange[1]
          } else {
            search.sendBeginTime = dateRange[0]
            search.sendEndTime = dateRange[1]
          }

        }
        return search
      },
      getList() {
        this.loading = true
        let addDateRange = this.addDateRangeByType(this.queryParams, this.dateRangeC, 1)
        addDateRange = this.addDateRangeByType(addDateRange, this.dateRangeP, 2)
        addDateRange = this.addDateRangeByType(addDateRange, this.dateRangeCT, 3)

        listOrder(addDateRange).then(response => {
          this.orderList = response.rows
          this.total = response.total
          this.loading = false
        })
      },
      getOrderStatusCount() {
        orderCountByStatus().then(response => {
          this.dfh = response.dfh
          this.dsh = response.dsh
          this.ysh = response.ysh
          this.tkz = response.tkz
          this.tkc = response.tkc
          this.tks = response.tks
        })
      },
      // 支付渠道(ALIPAY_APP : 支付宝APP支付; WXPAY_APP : APP微信支付 ; WXPAY_XCX : 微信小程序支付 ; WEPAY_GZH : 微信公众号支付)字典翻译
      payWayFormat(row, column) {
        return this.selectDictLabel(this.payWayOptions, row.payWay)
      },
      // 支付平台(ALIPAY :支付宝 ; WXPAY : 微信)字典翻译
      payPlatformFormat(row, column) {
        return this.selectDictLabel(this.payPlatformOptions, row.payPlatform)
      },
      // 支付类型 1在线支付 2货到付款字典翻译
      paymentTypeFormat(row, column) {
        return this.selectDictLabel(this.paymentTypeOptions, row.paymentType)
      },
      // 订单状态  0未付款 1已付款 2等待收货 3交易成功(待评价) 4已评价 5交易关闭 6退款中(卖家未发货,已提交申请(等待运营人员审核)) 7退款成功(交易关闭)字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.open2 = false
        this.open3 = false
        this.open4 = false
        this.reset()
        this.reset2()
        this.reset3()
        this.reset4()
      },
      cancelKd() {
        this.openkd = false
        this.src = ''
      },
      // 表单重置
      reset() {
        this.form = {
          shippingName: undefined,
          shippingCode: undefined
        }
        this.resetForm('form')
      },
      // 表单重置
      reset4() {
        this.form4 = {
          remark: null
        }
        this.resetForm('form4')
      },
      // 表单重置2
      reset2() {
        this.form2 = {
          orderId: '',
          reason: '',
          payment: '',
          postFee: '',
          refundFee: ''
        }
        this.resetForm('form2')
      },
      reset3() {
        this.form3 = {
          orderId: '',
          receiverName: '',
          receiverPhone: '',
          receiverState: '广东省',
          receiverCity: '',
          receiverAddress: '',
          receiverDistrict: ''
        }
        this.resetForm('form3')
      },
      /** 退款按钮操作 */
      refund(row) {
        this.reset2()
        this.refundFlag = true
        const id = row.orderId
        refundOrderById(id).then(response => {
          this.form2 = response.result
          this.form2.status = response.result.status.toString()
          this.form2.refundFee1 = response.result.refundFee
          this.form2.refundFee = response.result.payment - response.result.refundFee
          if (this.form2.image != '') {
            let imgs = []
            this.form2.images.forEach((item) => {
              this.flag == 2
              imgs.push({ url: item })
            })
            this.form2.moreImage = imgs
          }
          this.open2 = true
          this.title2 = '退款'
        })
      },
      /** 退款信息操作 */
      refundInfo(row) {
        this.reset2()
        this.refundFlag = false
        const id = row.orderId
        refundOrderById(id).then(response => {
          this.form2 = response.result
          this.form2.status = response.result.status.toString()
          this.form2.refundFee1 = response.result.refundFee
          if (this.form2.image != '') {
            let imgs = []
            this.form2.images.forEach((item) => {
              this.flag == 2
              imgs.push({ url: item })
            })
            this.form2.moreImage = imgs
          }
          this.open2 = true
          this.title2 = '退款信息'
        })
      },

      /** 备注按钮操作 */
      orderRemark(row) {
        this.reset4()
        this.form4.orderId = row.orderId
        this.form4.remark = row.remark
        this.open4 = true
        this.title4 = '备注'
      },
      /** 同意退款按钮 */
      agree: function() {
        this.$refs['form2'].validate(valid => {
          if (valid) {
            const form = this.form2
            if (this.form2.refundFee == '' || this.form2.refundFee == null) {
              this.msgError('请输入退款金额')
              return
            }
            if (this.form2.refundFee < 0.1) {
              this.msgError('退款金额不能小于0.1')
              return
            }
            if (this.form2.refundFee > this.form2.payment) {
              this.msgError('退款金额不能大于' + this.form2.payment)
              return
            }
            agreeRefund(this.form2).then(response => {
              if (response.code === 200) {
                this.msgSuccess('退款成功')
                this.open2 = false
                this.getList()
              } else {
                this.msgError(response.message)
              }
            })
          }
        })
      },

      /** 拒绝退款按钮 */
      notAgree: function() {
        this.$refs['form2'].validate(valid => {
          if (valid) {
            if (this.form2.remark == null || this.form2.remark == '') {
              this.msgError('请填写拒绝退款理由')
              return
            }
            notAgreeRefund(this.form2).then(response => {
              if (response.code === 200) {
                this.msgSuccess('拒绝退款成功')
                this.open2 = false
                this.getList()
              } else {
                this.msgError(response.message)
              }
            })
          }
        })
      },
      /** 备注确定按钮 */
      updateRemark: function() {
        this.$refs['form4'].validate(valid => {
          if (valid) {
            orderEditRemark(this.form4).then(response => {
              if (response.code === 200) {
                this.msgSuccess('添加备注成功')
                this.open4 = false
                this.getList()
              } else {
                this.msgError(response.message)
              }
            })
          }
        })
      },
      //修改收货地址
      updateAddress: function() {
        this.$refs['form3'].validate(valid => {
          if (valid) {
            if (this.form3.receiverState == '省') {
              this.msgError('请选择省份')
              return
            }
            if (this.form3.receiverCity == '市') {
              this.msgError('请选择市')
              return
            }
            if (this.form3.receiverDistrict == '区') {
              this.msgError('请选择区')
              return
            }
            orderEditAddress(this.form3).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改收货地址成功')
                this.open3 = false
                this.getList()
              } else {
                this.msgError(response.message)
              }
            })
          }
        })
      },

      linkDownload(data) {
        this.src = 'https://www.kuaidi100.com/chaxun?nu=' + data
        this.kdopen = true
        // window.open("https://www.kuaidi100.com/chaxun?nu="+data,'_blank') // 新窗口打开外链接

      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.queryParams.finish = null
        this.getList()
      },
      /** 搜索按钮操作 */
      handleQuery2(prm) {
        this.resetQuery()
        this.queryParams.pageNum = 1
        this.queryParams.status = prm
        this.getList()
      },
      /** 搜索按钮操作 */
      handleQuery3() {
        this.resetQuery()
        this.queryParams.pageNum = 1
        this.queryParams.finish = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRangeC = []
        this.dateRangeP = []
        this.dateRangeCT = []

        this.resetForm('queryForm')
        this.handleQuery()
        this.queryParams.finish = null
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.orderId)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      onSelected(data) {
        this.form3.receiverState = data.province.value
        this.form3.receiverCity = data.city.value
        this.form3.receiverDistrict = data.area.value
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title = '发货'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const orderId = row.orderId || this.ids
        getOrder(orderId).then(response => {
          this.form = response.data
          this.open = true
          this.title = '发货'
        })
      },

      /** 修改订单地址按钮操作 */
      orderAddress(row) {
        this.reset3()
        const orderId = row.orderId || this.ids
        orderShippingById(orderId).then(response => {
          this.form3 = response.result
          this.open3 = true
          this.title3 = '修改收货信息'
        })
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.orderId != undefined) {
              updateOrder(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.msg)
                }
              })
            } else {
              addOrder(this.form).then(response => {
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
      /** 删除按钮操作 */
      handleDelete(row) {
        const orderIds = row.orderId || this.ids
        this.$confirm('是否确认删除orderManager编号为"' + orderIds + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delOrder(orderIds)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const data = this.queryParams
        this.$confirm('是否确认根据查询条件导出数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return exportOrder2(data)
        }).then(response => {
          this.download(response.msg)
        }).catch(function() {
        })
      },

      /** 导入按钮操作 */
      handleImport() {
        this.upload.title = '导入快递单号'
        this.upload.open = true
      },

      // 文件上传中处理
      handleFileUploadProgress(event, file, fileList) {
        this.upload.isUploading = true
      },
      // 文件上传成功处理
      handleFileSuccess(response, file, fileList) {
        console.log(response)
        this.upload.open = false
        this.upload.isUploading = false
        this.$refs.upload.clearFiles()
        if (response.code == 200) {
          this.$alert(response.msg, '导入成功', { dangerouslyUseHTMLString: true })
        } else {
          this.$alert(response.message, '导入失败', { dangerouslyUseHTMLString: true })
        }

        this.getList()
      },
      // 提交上传文件
      submitFileForm() {
        this.$refs.upload.submit()
      }

    }
  }
</script>
<style>

  .logistic {
    width: 1500px;
    height: 1000px;
  }

  .order-list {
    margin-bottom: 15px;
  }

  .order-list .order-code {
    width: 100%;
    height: 40px;
    border: 1px solid #dfe6ec;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 1px;
    font-weight: 500;
    padding: 0 20px;

  }

  /*.order-list table  td{*/
  /*  border: 1px solid #cccccc;*/
  /*  text-align: center;*/
  /*}*/
  /*.order-list table{*/
  /*  margin-bottom: 20px;*/
  /*}*/
  /*.order-list table  th{*/
  /*  border: 1px solid #cccccc;*/
  /*  text-align: center;*/
  /*}*/
</style>
