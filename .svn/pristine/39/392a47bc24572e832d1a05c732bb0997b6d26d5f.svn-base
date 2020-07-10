import request from '@/utils/request'

// 查询
export function listagricultural(query) {
  return request({
    url: '/manage/agricultural/getAgriculturalList',
    method: 'get',
    params: query
  })
}

// 新增
export function insertagricultural(data) {
  return request({
    url: '/manage/agricultural/addAgricultural',
    method: 'post',
    data: data
  })
}

// 修改
export function updateagricultural(data) {
  return request({
    url: '/manage/agricultural/updateAgricultural',
    method: 'put',
    data: data
  })
}

//删除
export function delNongZi(landId) {
  return request({
    url: '/manage/agricultural/deleteAgricultural/' + landId,
    method: 'delete'
  })
}

//通过审核
export function passAgricultural(landId) {
  return request({
    url: '/manage/agricultural/agriculturalStatus/' + landId,
    method: 'put'
  })
}
//驳回审核
export function backAgricultural(landId) {
  return request({
    url: '/manage/agricultural/backAgricultural/' + landId,
    method: 'put'
  })
}
//获得详情
export function getagricultural(landId) {
  return request({
    url: '/manage/agricultural/getAgriculturalItem/' + landId,
    method: 'get'
  })
}


