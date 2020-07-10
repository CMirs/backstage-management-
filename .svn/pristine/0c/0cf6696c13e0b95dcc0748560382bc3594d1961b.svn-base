import request from '@/utils/request'

// 查询商品列表
export function listItem(query) {
  return request({
    url: '/item/list',
    method: 'get',
    params: query
  })
}

// 查询商品详细
export function getItem(id) {
  return request({
    url: '/item/' + id,
    method: 'get'
  })
}

// 新增商品
export function addItem(data) {
  return request({
    url: '/item/add',
    method: 'post',
    data: data
  })
}

// 修改商品
export function updateItem(data) {
  return request({
    url: '/item/update/'+data.id,
    method: 'put',
    data: data
  })
}

// 删除商品
export function delItem(id) {
  return request({
    url: '/item/del/' + id,
    method: 'delete'
  })
}

// 下架商品
export function stopItem(id) {
  return request({
    url: '/item/stop/'+id,
    method: 'put'
  })
}

// 发布商品
export function startItem(id) {
  return request({
    url: '/item/start/'+id,
    method: 'put'
  })
}
