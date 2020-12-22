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
    <div class="article-pager">
      <div
        v-if="previousArticle"
        class="article-pager-item"
      >
        <div class="navigation">
          <font-awesome-icon icon="angle-left" />
          上一篇
        </div>
        <div class="title text-ellipsis">
          <router-link
            :to="{ name: 'AuthorArticle', params: { id: previousArticle.id } }"
          >
            {{ previousArticle.title }}
          </router-link>
        </div>
      </div>
      <div
        v-if="nextAtricle"
        class="article-pager-item"
      >
        <div class="navigation text-right">
          下一篇
          <font-awesome-icon icon="angle-right" />
        </div>
        <div class="title text-ellipsis">
          <router-link
            :to="{ name: 'AuthorArticle', params: { id: nextAtricle.id } }"
          >
            {{ nextAtricle.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      articles: state => state.article.articles,
    }),
    article() {
      return this.articles.filter(article => article.id === this.articleId)[0]
    },
    articleId() {
      return this.$route.params.id
    },
    previousArticle() {
      const index = this.articles.indexOf(this.article) - 1
      return index >= 0 ? this.articles[index] : null
    },
    nextAtricle() {
      const index = this.articles.indexOf(this.article) + 1
      return index < this.articles.length ? this.articles[index] : null
    },
    articleContent() {
      return this.article.content.split('\n')
    },
  },
  mounted() {
    this.fetchArticles()
  },
  methods: {
    fetchArticles() {
      const account = this.$route.params.account
      this.$store.dispatch('fetchArticles', {
        account,
      })
    },
    formatDate(date) {
      return new Date(date).format('yyyy年MM月dd日 hh:mm')
    },
  },
}
</script>

<style lang="scss" scoped >
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

    p::after {
      content: "";
      display: inline-block;
    }
  }
  .article-pager {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
  }

  .article-pager-item {
    position: relative;
    margin: 0 5px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 14px 20px 14px 14px;
    width: 50%;

    .title {
      font-size: 20px;
      color: #007bff;
      text-align: center;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>