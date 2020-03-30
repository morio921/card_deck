import { $apis, $utils } from '@helper'

export default {
  async $getUserInfo ({commit, state}) {
    if (!state.userId) return
    let res = await $apis.getProfile({_id: state.userId})
    commit('$vuexSetUserInfo', res.value)
  },

  $setMenuList ({commit, state}, menuList) {
    commit('$vuexSetMenuList', menuList)
  },

  async $addNewDeck() {
    const res = await $apis.deck.addNewDeck()
    return res
  },

  /* eslint-disable */
  async $addToPile({ commit, state }, { codes, rotationCode, deckId }) {
    console.log('cardValue: ', codes)
    if (!deckId) return

    // prepare all cards (52) ready
    const drawnCardResult = await $apis.deck.drawCard(deckId)
    console.log('drawnCardResult result: ', codes, rotationCode)

    const sortedCodes = $utils.sortCode(codes, rotationCode)

    console.log('sortedCards: ', sortedCodes)

    if (drawnCardResult.success) {
      console.log('sortedCodes: ', sortedCodes)
      const res = await $apis.deck.addToPile(deckId, sortedCodes)
      const pileName = Object.keys(res.piles)[0]
      commit('$setPileName', pileName)
      commit('$setPileAdded', res.success)
      commit('$setRotationCard', rotationCode)
      return res.deck_id
    }
  }
}
