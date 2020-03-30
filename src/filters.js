import dayjs from 'dayjs'
import { romanObj } from '@helper/constants'

export default {
  dateTimeConvert (time) {
    return time && dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  },
  dateConvert (time) {
    return time && dayjs(time).format('YYYY-MM-DD')
  },

  getImageUrl(imageName) {
    const images = require.context('./assets/images', false, /\.png$/)
    return images('./' + imageName + '.png')
  },

  convertToRoman(num) {
    const arrConv = romanObj

    let arr = num.toString().split('').reverse()
    let i = 1
    for (let k = 0; k < arr.length; k++) {
      arr.splice(k, 1, arr[k] * i)
      i *= 10
    }

    let romansArray = []
    for (i = 0; i < arr.length; i++) {
      romansArray.push(arrConv[arr[i]] || '')
    }

    // It returns the string with the roman number
    return romansArray.reverse().join('')
  },

  filterValue(value) {
    if (value.length > 2) {
      return value.substr(0, 1)
    }
    return value
  }
}
