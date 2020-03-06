import axios from '@/libs/api.request'

export const getDevice = (data) => {
  return axios.request({
    url: 'device/all',
    data,
    method: 'post'
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
    url: 'device/list',
    data,
    method: 'post'
  })
}

export const addObj = ({ companyName , deviceName , describe , address }) => {
  const data = {
    companyName,
    deviceName,
    describe,
    address
  }
  return axios.request({
    url: 'device/add',
    data,
    method: 'post'
  })
}

export const updateObj = ({ deviceName , describe ,address }) => {
  const data = {
    deviceName,
    describe,
    address
  }
  return axios.request({
    url: 'device/update',
    data,
    method: 'post'
  })
}

export const delObj = (id) => {
  return axios.request({
    url: 'device/delete/' + id,
    method: 'get'
  })
}
