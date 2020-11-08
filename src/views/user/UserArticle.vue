<template>
  <div v-if="articles.length">
    <div class="article">
      <h2>{{ article.title }}</h2>
      <i
        v-if="article.lastModifyDate"
        class="date"
        :title="`發表日期：${formatDate(article.postDate)}`"
      >
        {{ formatDate(article.lastModifyDate) }} 🖉
      </i>
      <i
        v-else
        class="date"
      >
        {{ formatDate(article.postDate) }}
      </i>
      <div class="content">
        <p
          v-for="(item, index) in articleContent"
          :key="index"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div>
      <TheArticlesLatest />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheArticlesLatest from '@/components/user/TheArticlesLatest'

export default {
  components: {
    TheArticlesLatest,
  },
  data() {
    return {
      id: null,
    }
  },
  computed: {
    ...mapState({
      articles: state => state.article.articles,
    }),
    article() {
      return this.articles.filter(article => article.id === this.id)[0]
    },
    articleContent() {
      return this.article.content.split('\n')
    },
  },
  beforeMount() {
    this.id = this.$route.params.id
  },
  methods: {
    formatDate(date) {
      return new Date(date).format('yyyy年MM月dd日 hh:mm')
    },
  },
}
</script>

<style scoped lang="scss">
  .article {
    margin: 0 0 15px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 30px 50px;
    background-color: #fff;
  }

  .date {
    display: block;
    margin: 5px 0;
    font-size: 12px;
  }

  .content {
    padding-top: 20px;
  }
</style>