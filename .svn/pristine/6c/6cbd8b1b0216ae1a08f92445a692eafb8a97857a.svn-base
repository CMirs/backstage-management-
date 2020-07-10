import request from '@/utils/request'


// 查询品种列表
export function listVarieties(query) {
  return request({
    url: '/varieties/list',
    method: 'get',
    params: query
  })
}

// 新增品种
export function addVarieties(data) {
  return request({
    url: '/varieties/add',
    method: 'post',
    data: data
  })
}

// 修改品种
export function updateVarieties(data) {
  return request({
    url: '/varieties/update',
    method: 'put',
    data: data
  })
}

// 查询品种详细
export function getVarieties(id) {
  return request({
    url: '/varieties/detail/' + id,
    method: 'get'
  })
}
// 删除品种
export function deleteVarieties(id) {
  return request({
    url: '/varieties/del/'+id,
    method: 'put',
  })
}
