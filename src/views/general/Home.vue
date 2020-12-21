<template>
  <main class="home">
    <section class="latest-articles">
      <h2 class="text-center mb-md-5">
        最新文章
      </h2>
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
    padding: 15px 10px;
  }

  .latest-articles {
    margin: auto;
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 768px) {
    .latest-articles {
      width: auto;
      height: auto;
    }
  }
</style>