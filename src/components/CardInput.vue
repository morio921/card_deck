<template>
  <div class="card-input">
    <label for="input-live" class="card-input-label">Card {{ index }}:</label>
    <b-form-input
      class="card-input-box"
      v-model="inputVal"
    />
  </div>
</template>

<script>
export default {
  name: 'CardInput',
  props: {
    index: Number,
    value: String
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss">
.card-input {
  &-label {
    font-family: HelveticaNeue;
    font-size: 12px;
    font-weight: 500;
    line-height: 2;
    color: #b1b1b1;
    text-transform: uppercase;
    width: fit-content;
    margin-bottom: 0px;

  }

  &-box {
    height: 40px;
  }
}
</style>
