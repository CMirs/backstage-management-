import request from '@/utils/request'

// 查询箩筐列表
export function listpineapple(query) {
  return request({
    url: '/manage/pineapple/getBuoLuoList',
    method: 'get',
    params: query
  })
}

// 新增
export function insertpineapple(data) {
  return request({
    url: '/manage/pineapple/addPineapple',
    method: 'post',
    data: data
  })
}

// 修改
export function updatePineapple(data) {
  return request({
    url: '/manage/pineapple/updatePineappleItem',
    method: 'put',
    data: data
  })
}

//删除
export function delPineapple(landId) {
  return request({
    url: '/manage/pineapple/deletePineapple/' + landId,
    method: 'delete'
  })
}

export function passpineapple(landId) {
  return request({
    url: '/manage/pineapple/pineappleStatus/' + landId,
    method: 'put'
  })
}
export function backpineapple(landId) {
  return request({
    url: '/manage/pineapple/backPineapple/' + landId,
    method: 'put'
  })
}
//获得详情
export function getpineapple(id) {
  return request({
    url: '/manage/pineapple/getPineappleItem/' + id,
    method: 'get'
  })
}


