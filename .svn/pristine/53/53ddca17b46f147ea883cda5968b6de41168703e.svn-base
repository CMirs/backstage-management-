import request from '@/utils/request'


// 查询
export function listAfter(query) {
  return request({
    url: '/sale/getAfter',
    method: 'get',
    params: query
  })
}



// 新增
export function add(data) {
  return request({
    url: '/sale/addSaleAfter',
    method: 'post',
    data: data
  })
}

// 修改
export function update(data) {
  return request({
    url: '/sale/updateSaleAfter',
    method: 'put',
    data: data
  })
}

// 获取详情
export function getItem(id) {
  return request({
    url: '/sale/getAfterItem/' + id,
    method: 'get'
  })
}

// 删除
export function deletemessage(ids) {
  return request({
    url: '/sale/deletSaleAfter/' + ids,
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
