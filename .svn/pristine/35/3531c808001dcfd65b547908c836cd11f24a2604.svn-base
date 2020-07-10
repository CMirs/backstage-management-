import request from '@/utils/request'

// 查询承包土地列表
export function listContract(query) {
  return request({
    url: '/manage/contract/getContract',
    method: 'get',
    params: query
  })
}

// 新增
export function insertContract(data) {
  return request({
    url: '/manage/contract/addcontract',
    method: 'post',
    data: data
  })
}

// 修改
export function updateContract(data) {
  return request({
    url: '/manage/contract/updateContract',
    method: 'put',
    data: data
  })
}

//删除
export function delContract(landId) {
  return request({
    url: '/manage/contract/deleteContractLand/' + landId,
    method: 'delete'
  })
}
//通过审核
export function passLand(landId) {
  return request({
    url: '/manage/contract/contractStatus/' + landId,
    method: 'put'
  })
}
//驳回审核
export function backLand(landId) {
  return request({
    url: '/manage/contract/backContractLand/' + landId,
    method: 'put'
  })
}
//获得详情
export function getContract(landId) {
  return request({
    url: '/manage/contract/getContractItem/' + landId,
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
