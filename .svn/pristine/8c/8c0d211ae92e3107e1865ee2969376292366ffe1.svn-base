import request from '@/utils/request'

// 查询批发市场列表
export function listMarket(query) {
  return request({
    url: '/new/market/list',
    method: 'get',
    params: query
  })
}

// 查询批发市场详细
export function getMarket(id) {
  return request({
    url: '/new/market/' + id,
    method: 'get'
  })
}

// 新增批发市场
export function addMarket(data) {
  return request({
    url: '/new/market',
    method: 'post',
    data: data
  })
}

// 修改批发市场
export function updateMarket(data) {
  return request({
    url: '/new/market',
    method: 'put',
    data: data
  })
}

// 删除批发市场
export function delMarket(id) {
  return request({
    url: '/new/market/' + id,
    method: 'delete'
  })
}
// 更新市场状态
export function updateStatus(id,type) {
  return request({
    url: '/new/market/updateStatus?id='+id+"&type="+type ,
    method: 'get'
  })
}

// 导出批发市场
export function exportMarket(query) {
  return request({
    url: '/new/market/export',
    method: 'get',
    params: query
  })
}
