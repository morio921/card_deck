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
      'pileAdded',
      'rotationCard',
      'orderedCards'
    ])
  },

  methods: {
    ...mapActions([
      '$addNewDeck',
      '$addToPile'
    ]),

    $triggerSidenav () {
      let app = document.getElementById('app')
      app.className = !app.className ? 'menu-expand' : ''
    }
  }
})
