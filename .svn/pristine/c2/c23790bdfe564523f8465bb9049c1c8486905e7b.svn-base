import request from '@/utils/request'

// 查询商品列表
export function listDaPing(query) {
  return request({
    url: '/collect/listDaPing',
    method: 'get',
    params: query
  })
}

// 查询商品详细
export function getItem(id) {
  return request({
    url: '/collect/getItem/' + id,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/collect/update/',
    method: 'put',
    data: data
  })
}
