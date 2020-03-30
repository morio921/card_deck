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
    console.log('res:', res)
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
  },

  async $getPile({ commit, state }, { deckId, pileName }) {
    const pile = await $apis.deck.getPile(deckId, pileName)
    console.log('pile: ', pile)
    commit('$setOrderedCards', pile.piles[pileName].cards)

    const codes = pile.piles[pileName].cards.map((card) => {
      return card.code
    })

    // check Full House
    // get possible 5 combination arrays
    let fullHouse = []
    let fullHouseCandidate = []
    const getFullHouseCandidates = (startIndex = 0) => {
      for (let i = startIndex; i < codes.length; i++) {
        fullHouseCandidate.push(codes[i])
        if (fullHouseCandidate.length === 5) {
          if ($utils.isFullHouse(fullHouseCandidate)) {

            fullHouse.push([...fullHouseCandidate])
          }
          fullHouseCandidate.pop()
        } else {
          getFullHouseCandidates(i + 1)
          fullHouseCandidate.pop()
        }
      }
    }
    getFullHouseCandidates()

    console.log('#fullHouse', fullHouse)
    commit('$setFullHouseCards', fullHouse)
    commit('$setPileLoaded', pile.success)
    return pile
  }
}
