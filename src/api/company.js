import axios from '@/libs/api.request'

export const getCompany = () => {
  return axios.request({
    url: 'company/all',
    method: 'get'
  })
}

export const getData = ({ page , limit , companyName , deviceName }) => {
  const data = {
    page,
    limit,
    companyName,
    deviceName
  }
  return axios.request({
    url: 'company/list',
    data,
    method: 'post'
  })
}

export const addObj = ({ companyName , describe ,address }) => {
  const data = {
    companyName,
    describe,
    address
  }
  return axios.request({
    url: 'company/add',
    data,
    method: 'post'
  })
}

export const updateObj = ({ companyName , describe ,address }) => {
  const data = {
    companyName,
    describe,
    address
  }
  return axios.request({
    url: 'company/update',
    data,
    method: 'post'
  })
}

export const delObj = (id) => {
  return axios.request({
    url: 'company/delete/' + id,
    method: 'get'
  })
}
