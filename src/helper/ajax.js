import axios from 'axios'
import $q from 'q'
import { $utils } from '@helper'

function requestHandle (params) {
  let defer = $q.defer()
  axios(params)
    .then(res => {
      if (res.data) {
        if (res.data.success) {
          defer.resolve(res.data)
        } else {
          defer.reject('Error occurred in api call')
        }
      } else {
        defer.reject()
      }
    }).catch(err => {
      defer.reject(err)
    })

  return defer.promise
}

export default {
  post: function (url, params, op) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params
    })
  },
  get: function (url, params, op) {
    return requestHandle({
      method: 'get',
      url: $utils.queryString(url, params)
    })
  }
}
