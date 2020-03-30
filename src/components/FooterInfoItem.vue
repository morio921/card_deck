<template>
  <div class="footer-info-item">
    Footer Info Skeleton
    //TODO: Footer Info content
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
}
</style>
