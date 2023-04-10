import Request from '@/utils/request'

export default {
  getUserInfo(id) {
    return Request.get('/user/getUserInfo', { id: id })
  },
  setUserInfo(data) {
    return Request.post('/user/setUserInfo', { ...data })
  },
}
