import request from '@/utils/request'

// 查询箩筐列表
export function listFei(query) {
  return request({
    url: '/manage/feiLiao/getFerList',
    method: 'get',
    params: query
  })
}

// 新增
export function addFei(data) {
  return request({
    url: '/manage/fertilizer/addfertilizer',
    method: 'post',
    data: data
  })
}

// 修改
export function updateBasket(data) {
  return request({
    url: '/manage/fertilizer/updateFertilizer',
    method: 'put',
    data: data
  })
}

//删除
export function delFeiliao(landId) {
  return request({
    url: '/manage/fertilizer/deleteFertilizer/' + landId,
    method: 'delete'
  })
}
//通过
export function passFeiLiao(landId) {
  return request({
    url: '/manage/feiLiao/feiLiaoStatus/' + landId,
    method: 'put'
  })
}
//驳回
export function backFeiLiao(landId) {
  return request({
    url: '/manage/fertilizer/backFertilizer/' + landId,
    method: 'put'
  })
}

//获得详情
export function getFei(postId) {
  return request({
    url: '/manage/feiLiao/getFeiItem/' + postId,
    method: 'get'
  })
}


