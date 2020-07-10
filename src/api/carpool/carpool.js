import request from '@/utils/request'


// 查询拼车列表
export function listCarpool(query) {
  return request({
    url: '/manage/carpool/list',
    method: 'get',
    params: query
  })
}

// 查询拼车列表详情
export function listCarpoolDetail(query) {
  return request({
    url: '/manage/carpool/detail',
    method: 'get',
    params: query
  })
}

// 新增拼车订单
export function addCarpool(data) {
  return request({
    url: '/manage/carpool/addOrder',
    method: 'post',
    data: data
  })
}

// 修改拼车订单
export function updateCarpool(data) {
  return request({
    url: '/manage/carpool/update',
    method: 'put',
    data: data
  })
}

// 审核通过
export function passCarpool(id) {
  return request({
    url: '/manage/carpool/pass/'+id,
    method: 'put',
  })
}

// 审核不通过
export function failCarpool(id) {
  return request({
    url: '/manage/carpool/fail/'+id,
    method: 'put',
  })
}

// 拼团成功
export function susCarpool(carpoolCode) {
  return request({
    url: '/manage/carpool/success/'+carpoolCode,
    method: 'put',
  })
}

// 设置拼团价格
export function carpoolPrice(data) {
  return request({
    url: '/manage/carpool/price/'+data.carpoolCode,
    method: 'put',
    params: data
  })
}

// 设置个人拼团价格
export function carpoolUserPrice(data) {
  return request({
    url: '/manage/carpool/userPrice/'+data.id,
    method: 'put',
    params: data
  })
}

// 添加货车信息
export function carpoolInfo(data) {
  return request({
    url: '/manage/carpool/info',
    method: 'post',
    data: data
  })
}
// 获取货车信息
export function carpoolInfoDetail(query) {
  return request({
    url: '/manage/carpool/info/'+query.carpoolCode+"/"+query.id,
    method: 'get',
  })
}

// 设置拼团价格
export function carpoolPay(data) {
  return request({
    url: '/manage/carpool/price/'+data.carpoolCode,
    method: 'put',
    params: data
  })
}

// 付定金
export function carpoolPayMoney(id) {
  return request({
    url: '/manage/carpool/pay/' + id + "?payStatus=1",
    method: 'put'
  })
}

// 付尾款
export function carpoolPayAll(id) {
  return request({
    url: '/manage/carpool/pay/' + id + "?payStatus=2",
    method: 'put'
  })
}

// 交易完成
export function carpoolFinish(id) {
  return request({
    url: '/manage/carpool/finish/'+id,
    method: 'put',
  })
}

  // 查询活动详细
export function getCarpoolDetail(id) {
  return request({
    url: '/manage/carpool/detail/' + id,
    method: 'get'
  })

}
// 获取品种
export function getVarietiesList(id) {
  return request({
    url: '/manage/purchase/varieties',
    method: 'get'
  })
}

// 删除拼车订单
export function deleteCarpool(ids) {
  return request({
    url: '/manage/carpool/del/' + ids,
    method: 'delete'
  })
}
