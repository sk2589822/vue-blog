<template>
  <article
    v-if="Object.keys(article).length > 0"
    class="article"
    @mouseover="titleHover = true"
    @mouseleave="titleHover = false"
  >
    <p class="article-header">
      <a
        class="article-title"
        @click="toArticle(article.id)"
      >
        {{ article.title }}
      </a>
      <b-button
        v-if="showFunctionButtons"
        class="float-right"
        variant="danger"
        size="sm"
        @click="deleteArticle(article.id)"
      >
        刪除
      </b-button>
      <b-button
        v-if="showFunctionButtons"
        class="float-right"
        variant="primary"
        size="sm"
        :to="{ name: 'ArticleEdit', params: { id: article.id } }"
      >
        修改
      </b-button>
    </p>
    <p class="post-date">
      {{ formattedDate }}
    </p>
    <div v-if="preview">
      <p
        v-for="(item, index) in previewContent"
        :key="index"
      >
        {{ item }}
      </p>
    </div>
  </article>
  <div
    v-else
    class="no-article"
  >
    還沒有文章
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { db } from '@/store/firebase.js'

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {}
      },
    },
    preview: Boolean,
  },
  data() {
    return {
      titleHover: false,
    }
  },
  computed: {
    ...mapState({
      account: state => state.user.userInfo.account,
    }),
    isMyPage() {
      if (this.account !== undefined) {
        return this.account === this.$route.params.account
      }
      return false
    },
    formattedDate() {
      return new Date(this.article.postDate).format('yyyy年MM月dd日 hh:mm')
    },
    showFunctionButtons() {
      return this.isMyPage && this.titleHover
    },
    previewContent() {
      return this.article.content.slice(0, 50).split('\n')
    },
  },
  methods: {
    ...mapActions([
      'fetchArticles',
    ]),
    toArticle(id) {
      this.$router.push({
        name: 'UserArticle',
        params: {
          userId: this.article.userId,
          id,
        },
      })
    },
    deleteArticle: function(id) {
      this.$swal({
        title: '確定要刪除嗎？',
        text: '刪掉就沒了喔',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: '確定刪除',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await db.collection('Articles').doc(id).delete()
          this.fetchArticles({ account: this.account })
          this.$swal({
            icon: 'success',
            title:'文章已删除。',
          })
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
  .article,
  .no-article {
    display: flex;
    min-height: 100px;
    background-color: #fff;
  }

  .article {
    flex-direction: column;
    border-bottom: 1px solid #ddd;
    padding: 8px 32px;

    &:first-of-type,
    &:last-of-type {
      margin: 0;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }

  .no-article {
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-size: 32px;
  }

  .article-header {
    margin-bottom: 0.1rem;
    height: 34px;

    .btn {
      margin: 0.2em 0 0 1em;
    }
  }

  .article-title {
    justify-self: left;
    font-size: 24px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .post-date {
    display: flex;
    justify-self: left;
    margin-top: 3px;
    font-size: 12px;
  }
</style>