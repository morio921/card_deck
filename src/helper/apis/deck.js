import $ajax from '../ajax'
import * as c from '../constants'

const apiUrl = c.API_URL
const totalCard = c.TOTAL_CARD

export default {
  addNewDeck () {
    return $ajax.get(`${apiUrl}/deck/new/`)
  },

  drawCard (deckId) {
    return $ajax.get(`${apiUrl}/deck/${deckId}/draw/?count=${totalCard}`)
  },

  addToPile (deckId, cardValues) {
    const query = cardValues.join()
    return $ajax.get(`${apiUrl}/deck/${deckId}/pile/pile_${deckId}/add/?cards=${query}`)
  },

  getPile (deckId, pileName) {
    return $ajax.get(`${apiUrl}/deck/${deckId}/pile/${pileName}/list`)
  }
}
