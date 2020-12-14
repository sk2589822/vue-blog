<template>
  <div id="app">
    <TheHeader class="header" />
    <router-view class="main" />
    <footer class="footer">
      <div class="about-me">
        <a
          href="https://github.com/sk2589822/vue-blog"
          target="_blank"
        >
          <font-awesome-icon :icon="['fab', 'github']" />
          Github
        </a>
      </div>
    </footer>
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
    padding: 0;
    color: #222;
    background-color: #f3f6f9 !important;

    a:hover {
      text-decoration: none;
    }
  }

  li {
    list-style-type: none;
  }

  #app {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
    grid-template-areas:
        'header'
        'main'
        'footer';
    height: 100%;
  }

  .header {
    grid-area: header;
  }

  .main {
    grid-area: main;
  }

  .footer {
    grid-area: footer;
    color: rgba(255, 255, 255, 0.7);
    background-color: #455473;
  }

  .about-me {
    display: flex;
    align-items: center;
    margin: 15px auto 15px;
    width: 90%;
    height: 30px;

    a {
      color: rgba(255, 255, 255, 0.7);

      &:hover {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: underline;
      }
    }
  }

</style>
