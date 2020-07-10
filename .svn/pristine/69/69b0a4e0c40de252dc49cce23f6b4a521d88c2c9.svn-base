import request from '@/utils/request'


// 查询
export function listLunBo(query) {
  return request({
    url: '/sale/getSlideshow',
    method: 'get',
    params: query
  })
}

// 新增
export function addLunBo(data) {
  return request({
    url: '/sale/addSlideshow',
    method: 'post',
    data: data
  })
}

// 修改
export function updateLunBo(data) {
  return request({
    url: '/sale/updateSlideshow',
    method: 'put',
    data: data
  })
}

// 获取详情
export function getLunBoItem(id) {
  return request({
    url: '/sale/getSlideshowItem/' + id,
    method: 'get'
  })
}

// 删除
export function deleteLunBo(ids) {
  return request({
    url: '/sale/deleteSlideshow/' + ids,
    method: 'delete'
  })
}


export function startLunBo(status,id ) {
  const data = {
    status,
    id

  }
  return request({
    url: '/sale/startSlideshow',
    method: 'put',
    data: data
  })
}
