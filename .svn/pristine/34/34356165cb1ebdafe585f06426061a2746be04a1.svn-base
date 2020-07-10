import request from '@/utils/request'


// 查询会员列表
export function listMember(query) {
  return request({
    url: '/member/list',
    method: 'get',
    params: query
  })
}

// 新增会员
export function addMember(data) {
  return request({
    url: '/member/add',
    method: 'post',
    data: data
  })
}

// 修改会员
export function updateMember(data) {
  return request({
    url: '/member/update',
    method: 'post',
    data: data
  })
}
// 根据id获取会员
export function getMemberById(id) {
  return request({
    url: '/member/'+id,
    method: 'get'
  })
}
