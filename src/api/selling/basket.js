import request from '@/utils/request'

// 查询箩筐列表
export function listBasket(query) {
  return request({
    url: '/manage/basket/list',
    method: 'get',
    params: query
  })
}

// 新增
export function addBasket(data) {
  return request({
    url: '/manage/basket/addBasket',
    method: 'post',
    data: data
  })
}

// 修改
export function updateBasket(data) {
  return request({
    url: '/manage/basket/updateBasketItem',
    method: 'put',
    data: data
  })
}

//删除
export function removeBasket(dictIds) {
  return request({
    url: '/manage/basket/deleteLuoKun/' + dictIds,
    method: 'delete'
  })
}
//通过
export function passBasket(landId) {
  return request({
    url: '/manage/basket/basketStatus/' + landId,
    method: 'put'
  })
}


export function backBasket(landId) {
  return request({
    url: '/manage/basket/backBasket/' + landId,
    method: 'put'
  })
}
//获得详情
export function getBasket(postId) {
  return request({
    url: '/manage/basket/getBasketItem/' + postId,
    method: 'get'
  })
}


