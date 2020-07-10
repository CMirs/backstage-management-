import request from '@/utils/request'

// 查询订单详情列表
export function listOrder(query) {
  return request({
    url: '/order/detail?orderId='+query.orderId,
    method: 'get',

  })
}

// 查询订单详情详细
export function getOrder(id) {
  return request({
    url: '/product/order/' + id,
    method: 'get'
  })
}

// 新增订单详情
export function addOrder(data) {
  return request({
    url: '/product/order',
    method: 'post',
    data: data
  })
}
//发货
export function sendGood(data) {
  return request({
    url: '/order/sendGood',
    method: 'post',
    data: data
  })
}

// 修改订单详情
export function updateOrder(data) {
  return request({
    url: '/product/order',
    method: 'put',
    data: data
  })
}

// 删除订单详情
export function delOrder(id) {
  return request({
    url: '/product/order/' + id,
    method: 'delete'
  })
}

// 导出订单详情
export function exportOrder(query) {
  return request({
    url: '/product/order/export',
    method: 'get',
    params: query
  })
}
// 查询所有快递公司
export function getAllComList() {
  return request({
    url: '/express/getAllList',
    method: 'get'
  })
}
