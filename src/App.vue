<template>
  <QuickUI />
</template>

<script>
import QuickUI from './components/QuickUI.vue'

export default {
  name: 'App',
  components: {
    QuickUI
  }
}
</script>

<style>
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html {
  background-color: lightgrey;
}
{/*@import './assets/styles/mini-dark.min.css';*/}
</style>
