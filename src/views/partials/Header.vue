<template>
  <div class="header">
    <h1 v-if="isCards" class="uppercase-text">Cards</h1>
    <h1 v-if="isItem">Ordered Pile</h1>
  </div>
</template>

<script>
export default {
  name: 'header',

  computed: {
    isCards() {
      return this.$route.path === '/deck/new'
    },
    isItem() {
      return this.$route.path.includes('deck') && !!this.$route.params.id
    }
  }
}
</script>

<style type="text/css" lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

#app .header {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: $header-height;
  width: 100%;
  min-width: 320px;
  background-image: linear-gradient(97deg, #268700 15%, #248500 46%, #207a00 65%, #1b6b00);

  h1 {
    font-family: Arial;
    font-size: 48px;
    font-weight: bold;
    color: #fbe500;
    text-align: center;

    &.uppercase-text {
      text-transform: uppercase;
    }
  }
}
</style>
