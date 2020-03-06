import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: 'user/login',
    headers: {
      // isToken: false
      // 'TENANT_ID': '1',
      // 'Authorization': 'Basic cGlnOnBpZw=='
    },
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: 'user/info',
    // params: {
    //   token
    // },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/logout',
    method: 'post'
  })
}
