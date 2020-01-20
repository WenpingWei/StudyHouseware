import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
export function downloadFile(ids) {
  return service({
    url: '/deviceFileupload/download',
    method: 'post',
    data: ids,
    responseType: 'blob'
  })
}
