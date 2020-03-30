import Vue from 'vue'
import * as c from './constants'

const initialSuits = c.INITIAL_SUITS
const initialValues = c.INITIAL_VALUES

if (typeof String.prototype.startsWith !== 'function') {
  Window.String.prototype.startsWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix
  }
}

// helper functions for sorting by strongest to weakest
const getCardDetail = (code) => ({
  suit: code.slice(-1),
  value: code.slice(0, -1)
})

const getRelativeIndex = (relativeCard, rotationIndex, cardArray) => {
  const cardIndex = cardArray.findIndex((card) => relativeCard === card) - rotationIndex
  return cardIndex < 0 ? cardIndex + cardArray.length : cardIndex
}

// return = 1, -1, 0
const compareCode = (firstCard, secondCard, rotationCard, initArray) => {
  const rotationIndex = initArray.findIndex((card) => rotationCard === card)
  return getRelativeIndex(firstCard, rotationIndex, initArray) - getRelativeIndex(secondCard, rotationIndex, initArray)
}

export default {
  // codes sorted by strongest to weakest
  sortCode: (codes, rotationCode) => (codes.sort((firstCode, secondCode) => {
    const firstCard = getCardDetail(firstCode)
    const secondCard = getCardDetail(secondCode)
    const rotationCard = getCardDetail(rotationCode)

    // suit sorting first, and next is value sorting
    const sortResultBySuit = compareCode(firstCard.suit, secondCard.suit, rotationCard.suit, initialSuits)
    return sortResultBySuit === 0 ? compareCode(firstCard.value, secondCard.value, rotationCard.value, initialValues) : sortResultBySuit
  })),

  resMsg (res) {
    let key = {
      zh: 'Chinese',
      en: 'English'
    }[Vue.config.lang]
    try {
      let obj = JSON.parse(res.Message)
      return obj[key] || obj.Chinese
    } catch (e) {
      return res && res.Message
    }
  },

  serverUrl (apiName) {
    return `app/${apiName}`
  },

  titleLang (zhStr, enStr) {
    return {
      zh: zhStr,
      en: enStr
    }
  },

  query (search) {
    let str = search || window.location.search
    let objURL = {}

    str.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
      ($0, $1, $2, $3) => {
        objURL[$1] = $3
      }
    )
    return objURL
  },

  queryString (url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
  },

  /* -----------------------------localStorage------------------------------------ */
  /*
   * set localStorage
   */
  setStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  /**
   * get localStorage
   */
  getStorage (name) {
    if (!name) return
    let content = window.localStorage.getItem(name)
    return JSON.parse(content)
  },

  /**
   * delete localStorage
   */
  removeStorage (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}
