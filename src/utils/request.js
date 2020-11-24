import axios from 'axios'

const service = axios.create({ baseURL: 'http://localhost:8080' })
// service.interceptors.response.use(response => {

// }, error => { })

export default service