<template>
  <div v-if="loading" class="loading-wrapper">
    <b-spinner variant="success" label="Spinning"></b-spinner>
  </div>
  <div v-else class="new">
    <div class="new-content">
      <b-row>
        <b-col v-for="num in firstQueue" :key="num + 1">
          <card-input :index="num + 1" v-model="codes[num]" :id="`input-${num}`"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="num in secondQueue" :key="num + 1">
          <card-input :index="num + 1" v-model="codes[num]" :id="`input-${num}`" />
        </b-col>
      </b-row>
      
      <b-row align-h="center" class="rotation-card">
        <b-col></b-col>
        <b-col class="d-flex align-items-center justify-content-center">
          <span>Rotation Card</span>
        </b-col>
        <b-col>
          <b-form-input v-model="rotationCode" class="card-view-input"></b-form-input>
        </b-col>
        <b-col></b-col>
        <b-col></b-col>
      </b-row>
    </div>
    <div class="new-footer">
      <b-button @click="onSubmit">
        Submit
      </b-button>
    </div>
  </div>
</template>
<script>
import CardInput from '@components/CardInput'
import * as c from '@helper/constants'

export default {
  name: 'New',

  components: {
    CardInput
  },

  data () {
    return {
      rotationCode: '',
      codes: [],
      firstQueue: [],
      secondQueue: [],
      loading: false
    }
  },

  mounted () {
    this.firstQueue = c.FIRST_QUEUE
    this.secondQueue = c.SECOND_QUEUE
  },

  methods: {
    async onSubmit() {
      console.log('on submit: ', this.codes, this.rotationCode)
      const { codes, rotationCode } = this

      if (codes.length === 0) {  // card input validation
        alert('Please input one card at least!')
        return
      } else if (rotationCode === '') { // rotation card input validation
        alert('Please input rotation card!')
      } else {
        // loading
        this.loading = true

        // request create deck
        const createdDeck = await this.$addNewDeck()
        if (createdDeck.success) {
          // replace 10H with 0H that could be recognized by Deck Card API
          const replacedCodes = codes.map((code) => (code.replace(/10\/*/g, '0')))

          // request addToPiles
          const deckId = await this.$addToPile({
            codes: replacedCodes,
            rotationCode,
            deckId: createdDeck.deck_id
          })
          if (deckId) {
            this.$router.push({ path: `/deck/${deckId}` })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.new {
  height: 100%;
  padding: 48px;
  background-color: #dff4f7;

  &-content {
    > div {
      margin-bottom: 24px;
    }
    .rotation-card {
      margin-top: 73px;

      span {
        font-size: 28px;
        font-weight: bold;
        color: #343434;
        font-family: HelveticaNeue;
      }
    }
  }

  &-footer {
    position: absolute;
    left: 50%;
    bottom: 56px;
    transform: translateX(-50%);

    button, .btn-secondary:active, .btn-secondary:hover {
      width: 207px;
      height: 59px;
      border-radius: 20px;
      background-color: #1c0063;
      cursor: pointer;
      color: #fbe500;
      font-size: 32px;
    }
  }
}
</style>
