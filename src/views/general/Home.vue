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
  }

  .latest-articles {
    margin: auto;
  }
</style>