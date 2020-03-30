<template>
  <div class="card-view">
    Card View Skeleton
    //TODO: card view content
  </div>
</template>

<script>
export default {
  name: 'CardInput',
  props: {
    value: Number,
    suit: String
  },
  data () {
    return {
      value: '',
      suit: 'spade'
    }
  }
}
</script>

<style lang="scss">
.card-view {
  position: relative;
  display: flex;
  width: 136px;
  height: 238px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px 0 #826693;
  background-color: #ffffff;
  font-family: Arial;
}
</style>


