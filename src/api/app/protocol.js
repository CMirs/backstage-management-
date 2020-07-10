import request from '@/utils/request'


// 查询
export function listXieYi(query) {
  return request({
    url: '/sale/getUseragreement',
    method: 'get',
    params: query
  })
}
//获取分类列表
export function listcategory() {
  return request({
    url: '/pineapple/getCategory',
    method: 'get'

  })
}


// 新增
export function add(data) {
  return request({
    url: '/sale/addAfter',
    method: 'post',
    data: data
  })
}

// 修改
export function update(data) {
  return request({
    url: '/sale/updateStation',
    method: 'put',
    data: data
  })
}

// 获取详情
export function getItem(id) {
  return request({
    url: '/sale/getStationItem/' + id,
    method: 'get'
  })
}

// 删除
export function deletemessage(ids) {
  return request({
    url: '/sale/deleteStation/' + ids,
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
