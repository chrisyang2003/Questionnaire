import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/statis',
    method: 'get',
    params: query
  })
}
