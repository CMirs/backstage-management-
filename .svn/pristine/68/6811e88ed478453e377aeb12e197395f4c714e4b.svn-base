<template>
  <div class="app-container">
    <el-form :model="data1" ref="queryForm" :inline="true" label-width="100px">
      <el-row>
        <el-col :span="30">
          <el-form-item label="订单编号：">{{ data1.orderId }}</el-form-item>
        </el-col>
        <el-col :span="30">
          <el-form-item label="下单时间：">{{ data1.tbOrder.createTime != null ? parseTime(data1.tbOrder.createTime) :
            data1.tbOrder.createTime }}
          </el-form-item>
        </el-col>
        <el-col :span="30">
          <el-form-item label="付款时间：">{{data1.tbOrder.paymentTime!= null ? parseTime(data1.tbOrder.paymentTime) :
            data1.tbOrder.paymentTime }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户：">{{ data1.userName }}</el-form-item>
          <el-form-item label="订单总额：">{{ data1.tbOrder.payment }}</el-form-item>
          <el-form-item label="订单状态：">{{ getStringStatus(data1.tbOrder.status) }}</el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="买家留言：">{{ data1.tbOrder.buyerMessage }}</el-form-item>
          <el-form-item label="收货人：">{{ data1.tbOrderShipping.receiverName }}</el-form-item>
          <el-form-item label="收货手机号：">{{ data1.tbOrderShipping.receiverPhone }}</el-form-item>
          <el-form-item label="收货地址：">{{ data1.tbOrderShipping.receiverState +data1.tbOrderShipping.receiverCity +
            data1.tbOrderShipping.receiverDistrict + data1.tbOrderShipping.receiverAddress }}
          </el-form-item>
          <el-form-item label="邮编：">{{ data1.tbOrderShipping.receiverZip != null && data1.tbOrderShipping.receiverZip !=
            'null' ? data1.tbOrderShipping.receiverZip : '' }}
          </el-form-item>
          <el-form-item label-width="150px" label="确认收货时间：">{{data1.tbOrder.endTime!= null ?
            parseTime(data1.tbOrder.endTime) :
            data1.tbOrder.endTime }}
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="data1.tbOrder.status == 2">
          <div>发货信息:</div>
          <el-form-item label="发货人：">{{ data1.tbOrder.sendUserName }}</el-form-item>
          <el-form-item label="发货时间：">{{data1.tbOrder.consignTime != null ? parseTime(data1.tbOrder.consignTime) :
            data1.tbOrder.consignTime}}
          </el-form-item>
          <el-form-item label="快递公司：">{{data1.tbOrder.shippingName }}</el-form-item>
          <el-form-item label="运单号：">{{ data1.tbOrder.shippingCode }}</el-form-item>
        </el-col>
      </el-row>


      <el-row :span="50" v-if="data1.tbOrder.status == 1">
        <mark>请仔细核对订单中的商品规格和数量后再发货!!!</mark>
        <mark>请仔细核对订单中的商品规格和数量后再发货!!!</mark>
        <mark>请仔细核对订单中的商品规格和数量后再发货!!!</mark>

        <mark></mark>
        <mark></mark>
        <mark></mark>

      </el-row>
      <el-row :span="50" v-if="data1.tbOrder.status == 1">
        <mark></mark>
        <mark></mark>
        <mark></mark>

      </el-row>
      <el-row :span="50" v-if="data1.tbOrder.status == 1">


        <mark></mark>
        <mark></mark>
        <mark></mark>

      </el-row>
      <el-row :span="50">
        <el-button v-if="data1.tbOrder.status == 1"
                   type="primary"
                   icon="el-icon-save"
                   size="mini"
                   @click="sendGoods">
          发货
        </el-button>
        <el-button v-if="data1.tbOrder.status == 2"
                   type="primary"
                   icon="el-icon-save"
                   size="mini"
                   @click="updateGoods">
          修改物流信息
        </el-button>
      </el-row>
    </el-form>

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55" align="center"/>-->
      <!--<el-table-column label="详情id" align="center" prop="id"/>-->
      <el-table-column label="商品图片" align="center" prop="picPath">
        <template slot-scope="scope">
          <img slot="reference" :src="scope.row.picPath" :alt="scope.row.picPath"
               style="max-height: 50px;max-width: 130px">
        </template>
      </el-table-column>
      <el-table-column label="商品id" align="center" prop="itemId"/>
      <!--      <el-table-column label="订单id" align="center" prop="orderId"/>-->
      <el-table-column label="商品标题" align="center" prop="title"/>
      <!--      <el-table-column label="商品规格id" align="center" prop="itemSizeId"/>-->
      <el-table-column label="商品规格名称" align="center" prop="sizeName"/>
      <el-table-column label="商品单价" align="center" prop="price"/>
      <el-table-column label="购买数量" align="center" prop="num"/>
      <el-table-column label="商品总金额" align="center" prop="totalFee"/>
      <el-table-column label="规格单位" align="center" prop="units"/>
      <el-table-column label="用户UserId" align="center" prop="userId"/>
      <el-table-column label="留言信息" align="center" prop="buyerMessage"/>
    </el-table>

    <!-- 物流 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="快递公司" prop="expressComNo">
          <el-select v-model="form.expressComNo" placeholder="选择快递公司" clearable size="small">
            <el-option
              v-for="dict in expressComList"
              :key="dict.no"
              :label="dict.expressName"
              :value="dict.no"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="expressNo">
          <el-input v-model="form.expressNo" placeholder="请输入物流单号"/>
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
    addOrder,
    delOrder,
    exportOrder,
    getAllComList,
    getOrder,
    listOrder,
    sendGood,
    updateGoods,
    updateOrder
  } from '@/api/product/order/order_detail'

  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        flag: 1,
        expressComList: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 订单详情表格数据
        orderList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {

          orderId: undefined
        },
        // 表单参数
        form: {
          orderId: '',
          expressNo: '',
          expressComNo: ''
        },
        data1: {
          expressComNo: '',
          expressNo: '',
          tbOrder: {},
          tbOrderShipping: {},
          tbOrderItem: {}
        },
        order: undefined,
        shipping: undefined,

        // 表单校验
        rules: {
          expressNo: [
            { required: true, message: '运单号必须填写', trigger: 'blur' }
          ],
          expressComNo: [
            { required: true, message: '必须选择物流公司', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      const orderId = this.$route.params && this.$route.params.orderId
      this.queryParams.orderId = orderId
      this.getList()
      this.initComList()
    },
    methods: {
      initComList() {
        getAllComList().then(response => {
          this.expressComList = response.result
        })

      },
      //转换状态
      getStringStatus(data) {
        if (data == 0) {
          return '未付款'
        } else if (data == 1) {
          return '等待发货'
        } else if (data == 2) {
          return '等待收货'
        } else if (data == 3) {
          return '交易成功'
        } else if (data == 4) {
          return '已评价 '
        } else if (data == 5) {
          return '交易关闭 '
        } else if (data == 6) {
          return '退款中'
        } else if (data == 7) {
          return '退款成功'
        } else if (data == 8) {
          return '退款失败'
        } else {
          return '未定义的状态'
        }
      },
      /** 查询订单详情列表 */
      getList() {
        this.loading = true
        listOrder(this.queryParams).then(response => {
          let data1 = response.result
          data1.orderId = this.queryParams.orderId
          this.data1 = data1
          this.data1.orderId = this.queryParams.orderId

          this.order = data1.tbOrder
          this.shipping = data1.tbOrderShipping
          let detail = data1.tbOrderItem
          this.orderList = detail
          this.loading = false
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
          orderId: '',
          expressNo: '',
          expressComNo: ''
        }
        this.flag = 1
        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      // handleQuery() {
      //   this.form = {
      //     orderId: this.data1.orderId,
      //     expressNo: this.data1.expressNo,
      //     expressComNo: this.data1.expressComNo
      //   }
      //   this.$refs['queryForm'].validate(valid => {
      //     if (valid) {
      //       sendGood(this.form).then(response => {
      //         if (response.code === 200) {
      //           this.msgSuccess('发货成功')
      //           this.getList()
      //         } else {
      //           this.msgError(response.message)
      //         }
      //       })
      //     }
      //   })
      // },
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
      sendGoods() {
        this.reset()
        this.open = true
        this.flag = 1
        this.form.flag = 1
        this.title = '发货'
      },
      /** 修改按钮操作 */
      updateGoods(row) {
        this.reset()
        this.flag = 2
        this.form.flag = 2
        this.form.expressNo = this.data1.tbOrder.shippingCode,
        this.form.expressComNo = this.data1.tbOrder.expressComNo
        this.open = true
        this.title = '修改物流信息'
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.form.orderId = this.data1.tbOrder.orderId
            sendGood(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('操作成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.message)
              }
            })
          }
        })
      }
    }
  }
</script>
