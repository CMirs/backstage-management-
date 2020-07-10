import request from '@/utils/request'


// 查询
export function listStation(query) {
  return request({
    url: '/sale/getStation',
    method: 'get',
    params: query
  })
}



// 新增
export function add(data) {
  return request({
    url: '/sale/addStation',
    method: 'post',
    data: data
  })
}

// 修改
export function update(data) {
  return request({
    url: '/sale/updateStation',
    method: 'put',
    data: data
  })
}

// 获取详情
export function getItem(id) {
  return request({
    url: '/sale/getStationItem/' + id,
    method: 'get'
  })
}

// 删除
export function deletemessage(ids) {
  return request({
    url: '/sale/deleteStation/' + ids,
    method: 'delete'
  })
}



