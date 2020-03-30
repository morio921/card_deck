<template>
  <div v-if="pileLoaded" class="pile">
    <div class="pile-content container row">
      <div 
        v-for="(card, index) in cards"
        class="pile-content-item col-lg-3"
        :key="index"
      >
        <card-view
          :value="card.value"
          :suit="card.suit"
        />
      </div>
    </div>

    <div class="pile-footer">
      <div class="pile-footer-info">
        <footer-info-item
          :title="'Rotation Card'"
          :info="rotationCard"
        />
        <footer-info-item
          :title="'High Card'"
          :info="highCard"
        />
        <footer-info-item
          class="full-house"
          :title="'Full House Combo'"
          :info="fullHouseStatus"
          :fullHouseCombinations="fullHouse"
        />
      </div>
    </div>
  </div>
  <div v-else class="loading-wrapper">
    <b-spinner variant="success" label="Spinning"></b-spinner>
  </div>
</template>
<script>
import CardView from '@components/CardView'
import FooterInfoItem from '@components/FooterInfoItem'

export default {
  name: 'Pile',

  components: {
    CardView,
    FooterInfoItem
  },

  data () {
    return {
      rotationCode: '',
      highCard: '',
      fullHouseStatus: '',
      fullHouse: [],
      cards: []
    }
  },

  watch: {
    orderedCards(val) {
      // set cards data
      this.cards = val
      console.log('val in pile view: ', val)

      // set highCard data
      if (val.length > 0) {
        this.highCard = val[0].code.replace(/0\/*/g, '10')
      } else {
        this.highCard = 'None'
      }
    },
    fullHouseCards(val) {
      if (val.length > 0) {
        this.fullHouse = val
        this.fullHouseStatus = val.length
      } else {
        this.fullHouseStatus = 'None'
      }
    }
  },

  mounted () {
    const {
      rotationCard,
      pileName,
      pileAdded,
      $route: {
        params: { id }
      }
    } = this

    // check if deck and pile are created
    if (pileAdded) {
      this.rotationCode = rotationCard
      this.$getPile({ deckId: id, pileName })
    }
  }
}
</script>

<style lang="scss">
.pile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  background-color: #dff4f7;

  &-content {
    min-height: 70%;
    border: solid 2px #979797;
    background-color: #d8d8d8;
    padding: 24px 48px;

    &-item {
      margin: 10px 0;
    }
  }

  &-footer {
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }
}
</style>
