import request from '@/utils/request'

// 查询orderManager列表
export function listOrder(query) {
  return request({
    url: '/adminOrder/list',
    method: 'get',
    params: query
  })
}

// 查询orderManager详细
export function getOrder(orderId) {
  return request({
    url: '/adminOrder/' + orderId,
    method: 'get'
  })
}

// 新增orderManager
export function addOrder(data) {
  return request({
    url: '/adminOrder',
    method: 'post',
    data: data
  })
}
//导出orderManager
export function exportOrder2(data) {
  return request({
    url: '/order/export',
    method: 'post',
    data: data
  })
}

// 修改orderManager
export function updateOrder(data) {
  return request({
    url: '/adminOrder',
    method: 'put',
    data: data
  })
}

// 删除orderManager
export function delOrder(orderId) {
  return request({
    url: '/adminOrder/' + orderId,
    method: 'delete'
  })
}

// 导出orderManager
export function exportOrder(query) {
  return request({
    url: '/adminOrder/export',
    method: 'get',
    params: query
  })
}

// 退款详情
export function refundOrderById(orderId) {
  return request({
    url: '/order/refund/detail/'+orderId,
    method: 'get',
  })
}


// 拒绝申请退款
export function notAgreeRefund(data) {
  return request({
    url: '/order/notAgree/'+data.orderId,
    method: 'put',
    data: data.remark
  })
}


// 同意申请退款
export function agreeRefund(data) {
  return request({
    url: '/order/agree/refund',
    method: 'put',
    data: data
  })
}
// 修改订单地址
export function orderEditAddress(data) {
  return request({
    url: '/order/member/orderEditAddress',
    method: 'put',
    data: data
  })
}
//添加备注
export function orderEditRemark(data) {
  return request({
    url: '/order/member/remark',
    method: 'put',
    data: data
  })
}
// 订单地址详情
export function orderShippingById(orderId) {
  return request({
    url: '/order/orderAddress/'+orderId,
    method: 'get',
  })
}

// 统计不同状态订单数
export function orderCountByStatus() {
  return request({
    url: '/order/count/status',
    method: 'get',
  })
}
