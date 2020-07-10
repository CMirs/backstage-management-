import request from '@/utils/request'


// 查询采购列表
export function listPurchase(query) {
  return request({
    url: '/purchase/list',
    method: 'get',
    params: query
  })
}

// 新增采购订单
export function addPurchase(data) {
  return request({
    url: '/purchase/add',
    method: 'post',
    data: data
  })
}

// 修改采购订单
export function updatePurchase(data) {
  return request({
    url: '/purchase/update',
    method: 'put',
    data: data
  })
}

// 获取采购详情
export function getPurchaseById(id) {
  return request({
    url: '/purchase/detail/' + id,
    method: 'get'
  })
}

// 删除采购
export function deletePurchase(ids) {
  return request({
    url: '/purchase/del/' + ids,
    method: 'delete'
  })
}


// 还原采购订单
export function restorePurchase(id) {
  return request({
    url: '/purchase/restore/'+id,
    method: 'put'
  })
}
