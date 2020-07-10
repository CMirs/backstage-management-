import request from '@/utils/request'


// 查询活动列表
export function listActivity(query) {
  return request({
    url: '/manage/activity/select',
    method: 'get',
    params: query
  })
}

// 新增活动
export function addActivity(data) {
  return request({
    url: '/manage/activity/add',
    method: 'post',
    data: data
  })
}

// 修改活动
export function updateActivity(data) {
  return request({
    url: '/manage/activity/edit',
    method: 'put',
    data: data
  })
}

// 删除活动
export function delActivity(activityId) {
  return request({
    url: '/manage/activity/del/' + activityId,
    method: 'delete'
  })
}
  // 查询活动详细
export function getActivity(activityId) {
  return request({
    url: '/manage/activity/detail/' + activityId,
    method: 'get'
  })
}
