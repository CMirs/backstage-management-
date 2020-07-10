<template>
  <el-row :gutter="40" class="panel-group">

    <div style="display: flex;justify-content: flex-end;margin-top: -48px">
      <el-row :gutter="10" class="mb8">
        <el-button
          :autofocus="true"
          @click="handle1"
        >昨天</el-button>
      </el-row>


      <el-row :gutter="10" class="mb8">
        <el-button
          @click="handle2"
        >近7天</el-button>
      </el-row>



      <el-row :gutter="10" class="mb8">
        <el-button
          @click="handle3"
        >近30天</el-button>
      </el-row>
    </div>


    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            支付买家数
          </div>
          <div class="card-panel-num" v-html="buyCount"> 8000</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="shopping" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            订单数量
          </div>
          <div class="card-panel-num" v-html="orderCount"> 3000</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="money" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            成交金额
          </div>
          <div class="card-panel-num" v-html="doneMoney"> 1000</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            退款金额
          </div>
          <div class="card-panel-num" v-html="backMoney"> 2000</div>
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
  import { getMoneyCount } from '@/api/index/index'

  export default {

    data() {
      return {
        buyCount: '', //支付买家数
        orderCount: '',//订单数量
        backMoney: '',//退款金额
        doneMoney: '',//成交金额
        differentiate:1,
        sevendy:2,
        thirty:3,
      }



    },

    created() {
      this.handle1();
    },
    methods: {


      handle1() {
        getMoneyCount(this.differentiate).then(response => {
          this.buyCount = response.result.buyCount
          this.orderCount = response.result.orderCount
          this.backMoney = response.result.backMoney
          this.doneMoney = response.result.doneMoney
        })
      },

      handle2() {
        getMoneyCount(this.sevendy).then(response => {
          this.buyCount = response.result.buyCount
          this.orderCount = response.result.orderCount
          this.backMoney = response.result.backMoney
          this.doneMoney = response.result.doneMoney
        })
      },


      handle3() {
        getMoneyCount(this.thirty).then(response => {
          this.buyCount = response.result.buyCount
          this.orderCount = response.result.orderCount
          this.backMoney = response.result.backMoney
          this.doneMoney = response.result.doneMoney
        })
      },



   /*   memberNumber() {
        getMenberCount().then(response => {
          this.member = response.result
        })
      },
      itemNumber() {
        getItemCount().then(response => {
          this.item = response.result
        })
      },
      orderNumber() {
        getOrderCount().then(response => {
          this.order = response.result
        })
      },
      orderAmountNumber() {
        getOrderAmountCount().then(response => {
          this.orderAmount = response.result
        })
      }*/
    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
