import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.baseUrl.API_BASE

const axios = new HttpRequest(baseUrl)
export default axios
