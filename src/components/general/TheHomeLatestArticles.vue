<template>
  <div class="articles-container">
    <ul class="article-list">
      <template v-if="isArticlesFetched">
        <HomeArticleCard
          v-for="(article, index) in latesetArticles"
          :key="index"
          :article="article"
        />
      </template>
      <div
        v-else
        class="spinner-wrapper"
      >
        <b-spinner
          variant="primary"
        />
      </div>
    </ul>
  </div>
</template>

<script>
import { db } from '@/store/firebase.js'
import HomeArticleCard from '@/components/general/HomeArticleCard'

export default {
  components: {
    HomeArticleCard,
  },
  data() {
    return {
      latesetArticles: [],
      isArticlesFetched: false,
    }
  },
  mounted() {
    this.getlatesetArticles()
      .then(data => {
        this.latesetArticles = data
        this.isArticlesFetched = true
      })
  },
  methods: {
    getlatesetArticles: async function() {
      const articlesDocs = await db.collection('Articles').orderBy('postDate', 'desc').get()
      return articlesDocs.docs
        .slice(0, 6)
        .map(doc => Object.assign({},doc.data(), { id: doc.id }))
    },
  },
}
</script>

<style lang="scss" scoped>
  .articles-container {
    display: flex;
    justify-content: center;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 50px;
    background: #fff;
  }

  .article-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0;
    width: 750px;
  }

  .spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
  }
</style>