import request from '@/utils/request'


// 获取用户数
export function getMenberCount() {
  return request({
    url: '/member/count',
    method: 'get'
  })
}

// 获取商品数
export function getItemCount() {
  return request({
    url: '/item/count',
    method: 'get'
  })
}

// 获取订单数
export function getOrderCount() {
  return request({
    url: '/order/count',
    method: 'get'
  })
}

// 获取订单金额
export function getOrderAmountCount() {
  return request({
    url: '/order/amount',
    method: 'get'
  })
}

// 获取七日采购数量
export function getPurchaseCountDay() {
  return request({
    url: '/purchase/count/day7',
    method: 'get'
  })
}
// 获取七日供应数量
export function getGrowersCountDay() {
  return request({
    url: '/growers/count/day7',
    method: 'get'
  })
}
// 获取七日订单数
export function getOrderCountDay() {
  return request({
    url: '/order/count/day7',
    method: 'get'
  })
}

// 获取不同用户数
export function getMemberCountDay() {
  return request({
    url: '/member/count/all',
    method: 'get'
  })
}

// 获取拼车数
export function getCarpoolCountDay() {
  return request({
    url: '/carpool/count/day7',
    method: 'get'
  })
}

// 获取七日不同状态订单数
export function getOrderStatusCountDay() {
  return request({
    url: '/order/count/status/day7',
    method: 'get'
  })
}

// 获取统计金额
export function getMoneyCount(differentiate) {
  return request({
    url: '/order/statistics/'+differentiate,
    method: 'get',

  })
}

//7日金额
export function getSevenOrderMonenyDay() {
  return request({
    url: '/order/amountSeven/',
    method: 'get',

  })
}

export function getSevenOrderMonenyDayBack() {
  return request({
    url: '/order/amountDone/',
    method: 'get',

  })
}


