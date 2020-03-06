import axios from '@/libs/api.request'

export const getData = (data) => {

  return axios.request({
    url: 'acrRecord/list',
    data,
    method: 'post'
  })
}
