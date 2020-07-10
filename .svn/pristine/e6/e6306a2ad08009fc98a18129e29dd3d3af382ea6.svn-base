import request from '@/utils/request'


export function getXuWenLineData(query) {
  return request({
    url: '/marketPrice/getXuWenLineData',
    method: 'get',
    params: query

  })
}export function getXuWenLineDataByMonth(query) {
  return request({
    url: '/marketPrice/getXuWenLineDataMonth',
    method: 'get',
    params: query

  })
}
export function getMarketList() {
  return request({
    url: '/new/market/all' ,
    method: 'get'
  })
}
// 发布
export function savePrice(data) {
  return request({
    url: '/marketPrice/savePrice',
    method: 'post',
    data: data
  })

}

export function getMarketPriceList(query) {
  return request({
    url: '/marketPrice/list' ,
    method: 'get',
    params: query
  })
}
// 修改
export function updatePrice(data) {
  return request({
    url: '/marketPrice/updatePrice',
    method: 'post',
    data: data
  })
}

// 获取市场价格详情
export function getMarketPriceById(id) {
  return request({
    url: '/marketPrice/all/' + id,
    method: 'get'
  })
}


// 导出行情数据
export function exportData(query) {
  return request({
    url: '/marketPrice/export',
    method: 'get',
    params: query
  })
}
