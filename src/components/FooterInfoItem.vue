<template>
  <div class="footer-info-item">
    <span>{{ title }} : {{ info }} </span>
    <div class="footer-info-item-list">
      <div
        v-for="(items, itemsIndex) in fullHouseCombinations"
        :key="`items-${itemsIndex + 1}`"
      >
        <span>{{ itemsIndex + 1 | convertToRoman }}.</span>
        <span>
          {{ items.join().replace(/0\/*/g, '10') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterInfoItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    fullHouseCombinations: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss">
.footer-info-item {
  display: flex;
  padding: 10px 0;
  font-family: Arial;

  > span:first-child {
    color: #343434;
    font-size: 32px;
    margin-right: 5px;
    font-weight: bold;
    margin-right: 10px;
  }

  > span:nth-child(2n) {
      font-size: 32px;
      color: #343434;
  }

  &-list {
    display: flex;
    flex-direction: column;
  }

  &.full-house {
    flex-direction: column;

    .footer-info-item-list {
      margin-top: 10px;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        font-size: 21px;

        > span:first-child {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
