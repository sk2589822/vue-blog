<template>
  <section>
    <div class="functions-bar">
      <b-button
        v-if="isMyPage"
        variant="primary"
        class="new-post-button"
        :to="{ name: 'ArticleCreate'}"
      >
        發新文章
      </b-button>
      <b-button-group class="view-options">
        <b-button
          variant="outline-primary"
          :class="[{ active: isPreviewMode }, 'view-mode-button']"
          @click="toggleViewMode(true)"
        >
          詳細
        </b-button>
        <b-button
          variant="outline-primary"
          :class="[{ active: !isPreviewMode }, 'view-mode-button']"
          @click="toggleViewMode(false)"
        >
          一覽
        </b-button>
      </b-button-group>
    </div>
    <template v-if="articlesToShow.length">
      <div class="articles-list">
        <ArticleCard
          v-for="(article, index) of articlesToShow"
          :key="index"
          :article="article"
          :is-preview-mode="isPreviewMode"
        />
      </div>
      <div class="overflow-auto pagination">
        <b-pagination-nav
          v-model="currentPage"
          :link-gen="linkGen"
          :number-of-pages="pageCount"
          use-router
        />
      </div>
    </template>
    <template v-else>
      <ArticleCard
        :article="{}"
      />
    </template>
  </section>
</template>

<script>
import ArticleCard from '@/components/author/ArticleCard'
import { mapState } from 'vuex'

export default {
  components: {
    ArticleCard,
  },
  data() {
    return {
      isPreviewMode: true,
      currentPage: 1,
    }
  },
  computed: {
    ...mapState({
      articles: state => state.article.articles,
      userAccount: state => state.user?.userInfo?.account,
    }),
    isMyPage() {
      if (this.userAccount) {
        return this.userAccount === this.authorAccount
      }
      return false
    },
    articlesPerPage() {
      return this.isPreviewMode ? 4 : 8
    },
    pageCount() {
      if (this.articles.length) {
        return Math.ceil(this.articles.length / this.articlesPerPage)
      } else {
        return 0
      }
    },
    articlesToShow() {
      const page = this.currentPage
      const start = (page - 1) * this.articlesPerPage
      const end = start + this.articlesPerPage
      return this.articles.slice(start, end)
    },
    authorAccount() {
      return this.$route.params.account
    },
  },
  watch: {
    authorAccount() {
      this.fetchArticles()
      this.currentPage = this.$route.params.page || 1
    },
  },
  mounted() {
    this.fetchArticles()
    this.currentPage = this.$route.params.page || 1
  },
  methods: {
    fetchArticles() {
      const account = this.authorAccount
      this.$store.dispatch('fetchArticles', {
        account,
      })
    },
    linkGen(page) {
       return {
        name: 'AuthorArticles',
        params: { page },
      }
    },
    toggleViewMode(preview) {
      this.isPreviewMode = preview
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss" scoped>
  @mixin main-theme {
    border: 1px solid #ddd;
    background: #fff;
  }

  .functions-bar {
    @include main-theme;

    display: flex;
    margin-bottom: 20px;
    padding: 17px 15px;
  }

  .view-options {
    margin-left: auto;
  }

  .btn {
    box-shadow: none !important;
  }

  .view-mode-button.active {
    border-color: #007bff;
    background-color: #007bff;
    color: #fff;
  }

  .articles-list {
    @include main-theme;
  }

  .pagination {
    justify-content: center;
    padding-top: 20px;
  }
</style>