import request from '@/utils/request'

// 查询土地出租列表
export function listLand(query) {
  return request({
    url: '/manage/changdi/list',
    method: 'get',
    params: query
  })
}

// 新增土地出租
export function insertLand(data) {
  return request({
    url: '/manage/changdi/addLand',
    method: 'post',
    data: data
  })
}

// 修改
export function updateLand(data) {
  return request({
    url: '/manage/changdi/updateLandItem',
    method: 'put',
    data: data
  })
}

//删除
export function delLand(landId) {
  return request({
    url: '/manage/changdi/deleteLandMessage/' + landId,
    method: 'delete'
  })
}
//通过
export function delPass(landId) {
  return request({
    url: '/manage/changdi/landStatus/' + landId,
    method: 'put'
  })
}


export function backLand(landId) {
  return request({
    url: '/manage/changdi/landBack/' + landId,
    method: 'put'
  })
}
//获得详情
export function getLand(landId) {
  return request({
    url: '/manage/changdi/getLandItem/' + landId,
    method: 'get'
  })
}

// 查询土地出租列表
export function listBasket(query) {
  return request({
    url: '/manage/basket/list',
    method: 'get',
    params: query
  })
}
