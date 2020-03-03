import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.baseUrl.API_BASE
console.log(baseUrl);

const axios = new HttpRequest(baseUrl)
export default axios
