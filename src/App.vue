<template>
  <div id="app">
    <TheHeader />
    <router-view />
  </div>
</template>

<script>
import TheHeader from '@/components/general/TheHeader'

export default {
  components: {
    TheHeader,
  },
}
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");

  * {
      outline: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
  }

  body {
    position: relative;
    // display: grid;
    // grid-template-columns: 1fr;
    padding: 0;
    color: #222;
    background-color: #f3f6f9 !important;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 1.2rem;

    a:hover {
      text-decoration: none;
    }
}
</style>
