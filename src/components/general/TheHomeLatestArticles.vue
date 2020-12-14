<template>
  <div class="articles-container">
    <ul class="class-list">
      <HomeArticleCard
        v-for="(article, index) in latesetArticles"
        :key="index"
        :article="article"
      />
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
    }
  },
  mounted() {
    this.getlatesetArticles()
      .then(data => this.latesetArticles = data)
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
    border-bottom: none;
    background: #fff;
  }

  .class-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    width: 750px;
  }
</style>