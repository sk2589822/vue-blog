<template>
  <div class="articles-container d-flex justify-content-center w-100">
    <transition
      name="fade"
      mode="out-in"
    >
      <ul
        v-if="isArticlesFetched"
        class="article-list d-flex justify-content-center flex-wrap m-0"
      >
        <HomeArticleCard
          v-for="(article, index) in latesetArticles"
          :key="index"
          :article="article"
        />
      </ul>
      <div
        v-else
        class="spinner-wrapper d-flex justify-content-center align-items-center"
      >
        <b-spinner
          variant="primary"
        />
      </div>
    </transition>
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
        .map(doc => Object.assign({}, doc.data(), { id: doc.id }))
    },
  },
}
</script>

<style lang="scss" scoped>
  .articles-container {
    height: calc(100% - 3rem);
    border: 1px solid #ddd;
    border-radius: 50px;
    background: #fff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .article-list {
    width: 100%;
  }

  .spinner-wrapper {
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 768px) {
    .article-list {
      width: 750px;
    }

    .spinner-wrapper {
      width: 750px;
      height: 600px;
    }
  }
</style>