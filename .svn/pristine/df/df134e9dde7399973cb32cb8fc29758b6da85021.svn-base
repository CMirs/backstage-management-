import request from '@/utils/request'


// 查询供应社列表
export function listGrowersCoo(query) {
  return request({
    url: '/manage/growers/coo/list',
    method: 'get',
    params: query
  })
}
// 查询所有供应社
export function listAllGrowersCoo(query) {
  return request({
    url: '/manage/growers/coo/all?areaBase='+query,
    method: 'get',
  })
}

// 查询所有供应社
export function listAllGrowersCoo2() {
  return request({
    url: '/manage/growers/coo/all',
    method: 'get',
  })
}
// 新增供应社
export function addGrowersCoo(data) {
  return request({
    url: '/manage/growers/coo/add',
    method: 'post',
    data: data
  })
}

// 修改供应社
export function updateGrowersCoo(data) {
  return request({
    url: '/manage/growers/coo/update',
    method: 'put',
    data: data
  })
}

// 获取供应社详情
export function getGrowersCooById(id) {
  return request({
    url: '/manage/growers/coo/' + id,
    method: 'get'
  })
}

// 删除供应社
export function deleteGrowersCooById(ids) {
  return request({
    url: '/manage/growers/coo/del/' + ids,
    method: 'put'
  })
}
