import request from '@/utils/request'

// 查询十大市场天气预报列表
export function listWeather(query) {
  return request({
    url: '/gen/weather/list',
    method: 'get',
    params: query
  })
}

// 查询十大市场天气预报详细
export function getWeather(id) {
  return request({
    url: '/gen/weather/' + id,
    method: 'get'
  })
}

// 新增十大市场天气预报
export function addWeather(data) {
  return request({
    url: '/gen/weather',
    method: 'post',
    data: data
  })
}

// 修改十大市场天气预报
export function updateWeather(data) {
  return request({
    url: '/gen/weather',
    method: 'put',
    data: data
  })
}

// 删除十大市场天气预报
export function delWeather(id) {
  return request({
    url: '/gen/weather/' + id,
    method: 'delete'
  })
}

// 导出十大市场天气预报
export function exportWeather(query) {
  return request({
    url: '/gen/weather/export',
    method: 'get',
    params: query
  })
}
