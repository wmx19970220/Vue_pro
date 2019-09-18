<template>
  <div id="app">
      <lay-out></lay-out>
  </div>
</template>

<script>
import LayOut from './components/layout'

export default {
  name: 'app',
  components: {
   LayOut
  }
}
</script>

<style lang="scss">
#app ,html,body{
  width:100%;
  height: 100%;
  overflow-y:auto;
}
</style>
