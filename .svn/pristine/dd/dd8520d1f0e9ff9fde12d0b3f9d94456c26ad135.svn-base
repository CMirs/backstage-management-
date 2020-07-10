import request from '@/utils/request'


// 查询资讯
export function listPineapple(query) {
  return request({
    url: '/pineapple/list',
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
export function addPineapple(data) {
  return request({
    url: '/pineapple/add',
    method: 'post',
    data: data
  })
}

// 修改
export function updatePineapple(data) {
  return request({
    url: '/pineapple/update',
    method: 'put',
    data: data
  })
}

// 获取详情
export function getItem(id) {
  return request({
    url: '/pineapple/getById/' + id,
    method: 'get'
  })
}

// 删除
export function deletePineapple(ids) {
  return request({
    url: '/pineapple/deleteArticle/' + ids,
    method: 'delete'
  })
}


// 返回置顶个数
export function getTopCount(pid) {
  return request({
    url: '/pineapple/topcount/'+pid,
    method: 'get'
  })
}
//市场
export function getMarketList() {
  return request({
    url: '/new/market/all' ,
    method: 'get'
  })
}
