<template>
  <div class="page-frame">
    <header-component></header-component>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@views/partials/Header'

export default {
  name: 'Frame',
  components: {
    HeaderComponent
  }
}
</script>

<style lang="scss">
.page-frame {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .page-content {
    margin-top: 138px;
    height: 100%;
    background-color: #dff4f7;
  }
  main {
    flex: 1;
  }
}
</style>
