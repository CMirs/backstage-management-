import request from '@/utils/request'


// 查询基地列表
export function listArea(query) {
  return request({
    url: '/manage/growers/area/list',
    method: 'get',
    params: query
  })
}

// 查询所有基地
export function listAllArea(query) {
  return request({
    url: '/manage/growers/area/all',
    method: 'get',
    params: query
  })
}


// 新增基地
export function addArea(data) {
  return request({
    url: '/manage/growers/area/add',
    method: 'post',
    data: data
  })
}

// 修改基地
export function updateArea(data) {
  return request({
    url: '/manage/growers/area/update',
    method: 'put',
    data: data
  })
}

// 获取基地详情
export function getAreaById(id) {
  return request({
    url: '/manage/growers/area/' + id,
    method: 'get'
  })
}

// 删除基地
export function deleteAreaById(ids) {
  return request({
    url: '/manage/growers/area/del/' + ids,
    method: 'put'
  })
}
