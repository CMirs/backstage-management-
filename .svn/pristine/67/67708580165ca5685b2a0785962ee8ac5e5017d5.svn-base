import request from '@/utils/request'

// 查询分类列表
export function listMenu(query) {
  return request({
    url: '/item/cat/list',
    method: 'get',
    params: query
  })
}

// 查询分类详细
export function getMenu(menuId) {
  return request({
    url: '/item/cat/' + menuId,
    method: 'get'
  })
}

// 查询分类下拉树结构
export function treeselect() {
  return request({
    url: '/item/cat/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询分类下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/item/cat/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增分类
export function addMenu(data) {
  return request({
    url: '/item/cat/add',
    method: 'post',
    data: data
  })
}

// 修改分类
export function updateMenu(data) {
  return request({
    url: '/item/cat/edit',
    method: 'put',
    data: data
  })
}

// 删除分类
export function delMenu(menuId) {
  return request({
    url: '/item/cat/' + menuId,
    method: 'delete'
  })
}
