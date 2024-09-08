<template>
  <CommonHeader/>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
 
</template>

<script>
// import CommonHeader from './components/CommonHeader.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // CommonHeader,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
