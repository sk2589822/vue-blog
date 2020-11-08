<template>
  <div>
    <ArticleCard
      v-for="(article, index) of articlesToShow"
      :key="index"
      :article="article"
      :preview="false"
    />
  </div>
</template>

<script>
import ArticleCard from '@/components/user/ArticleCard'
import { mapState } from 'vuex'

export default {
  components: {
    ArticleCard,
  },
  computed: {
    ...mapState({
      articles: state => state.article.articles,
    }),
    articlesToShow() {
      return this.articles.slice(0, 5)
    },
  },
}
</script>

<style scoped lang="scss">
  article {
    background-color: #000;
  }
</style>