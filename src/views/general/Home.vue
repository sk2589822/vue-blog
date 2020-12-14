<template>
  <main class="home">
    <section class="latest-articles">
      <TheHomeLatestArticles />
    </section>
  </main>
</template>

<script>
import TheHomeLatestArticles from '@/components/general/TheHomeLatestArticles'

export default {
  components: {
    TheHomeLatestArticles,
  },
}
</script>

<style lang="scss" scoped>
  .home {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    background: linear-gradient(rgb(181, 255, 211), white)
  }

  .latest-articles {
    margin: auto;
  }
</style>