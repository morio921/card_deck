import Vue from 'vue'
import {mapState, mapActions} from 'vuex'

Vue.mixin({
  data () {
    return {
    }
  },

  computed: {
    $currentLang () {
      return Vue.config.lang || 'zh'
    },

    ...mapState([
      'pileName',
      'pileAdded',
      'rotationCard',
      'orderedCards',
      'fullHouseCards',
      'pileLoaded'
    ])
  },

  methods: {
    ...mapActions([
      '$addNewDeck',
      '$addToPile',
      '$getPile'
    ]),

    $triggerSidenav () {
      let app = document.getElementById('app')
      app.className = !app.className ? 'menu-expand' : ''
    }
  }
})
