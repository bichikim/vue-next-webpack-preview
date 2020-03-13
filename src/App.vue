<template lang="pug">
  img(src="./logo.png")
  h1 Hello Vue 3!
    h2 hoho
  button(@click="inc") Clicked {{ count }} times {{nameCount}}
</template>

<script lang="ts">
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const inc = () => {
      count.value++
    }
    const nameCount = computed((ctx) => {
      console.log(ctx)
      return `foo ${count.value}`
    })

    return {
      nameCount,
      count,
      inc
    }
  }
}
</script>

<style scoped lang="stylus">
img
  width: 200px
h1
  font-family: Arial, Helvetica, sans-serif
</style>
