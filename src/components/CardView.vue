<template>
  <div class="card-view">
    <div class="card-view__top">
      <span>{{ value | filterValue }}</span>
      <img :src="suit | getImageUrl" :alt="suit" />
    </div>
    <div class="card-view__bottom">
      <img :src="suit | getImageUrl" :alt="suit" />
      <span>{{ value | filterValue }}</span>
    </div>
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

  span {
    color: #343434;
    font-size: 32px;
    font-weight: bold;
  }
  img {
    width: 24px;
    height: 30px;
  }

  &__top {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    > span, img {
      -ms-transform: rotate(0deg); /* IE 9 */
      transform: rotate(0deg);
    }
    > span {
      margin-right: 5px;
    }
  }
  &__bottom {
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    > span, img {
      -ms-transform: rotate(180deg); /* IE 9 */
      transform: rotate(180deg);
    }
    > img {
      margin-right: 5px;
    }
  }
}
</style>
