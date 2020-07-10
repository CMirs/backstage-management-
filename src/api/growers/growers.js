import request from '@/utils/request'


// 查询供应列表
export function listGrowers(query) {
  return request({
    url: 'growers/supply/list',
    method: 'get',
    params: query
  })
}

// 新增供应订单
export function addGrowers(data) {
  return request({
    url: '/growers/supply/add',
    method: 'post',
    data: data
  })
}

// 修改供应订单
export function updateGrowers(data) {
  return request({
    url: '/growers/supply/update',
    method: 'put',
    data: data
  })
}

// 获取供应详情
export function getGrowersById(id) {
  return request({
    url: '/growers/detail/' + id,
    method: 'get'
  })
}

// 下架供应单
export function deleteGrowers(ids) {
  return request({
    url: '/growers/supply/delete/' + ids,
    method: 'put'
  })
}


// 审核通过
export function passGrowersSupply(id) {
  return request({
    url: '/growers/supply/pass/'+id,
    method: 'put'
  })
}

// 审核不通过
export function failGrowersSupply(id) {
  return request({
    url: '/growers/supply/fail/'+id,
    method: 'put'
  })
}
