<template>
  <div>
    <ArticleCard
      v-for="(article, index) of articles"
      :key="index"
      :article="article"
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
    ...mapState([
      'articles',
    ]),
  },
}
</script>

<style scoped lang="scss">
  article {
    background-color: #000;
  }
</style>