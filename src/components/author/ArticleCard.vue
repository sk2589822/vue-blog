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
        variant="primary"
        size="sm"
        class="edit-button"
        :to="{ name: 'ArticleEdit', params: { id: article.id } }"
      >
        修改
      </b-button>
      <b-button
        v-if="showFunctionButtons"
        variant="danger"
        size="sm"
        @click="deleteArticle(article.id)"
      >
        刪除
      </b-button>
    </p>
    <p class="post-date">
      {{ formattedDate }}
    </p>
    <div v-if="isPreviewMode">
      <p
        v-for="(item, index) in articlePreview"
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
    isPreviewMode: {
      type: Boolean,
    },
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
    articlePreview() {
      const previewLength = 50
      const articleContent = this.article.content
      const previewArray = articleContent
        .slice(0, previewLength)
        .trimEnd()
        .split('\n')

      if (articleContent.length > previewLength) {
        previewArray[previewArray.length - 1] += '......'
      }
      return previewArray
    },
  },
  methods: {
    ...mapActions([
      'fetchArticles',
    ]),
    toArticle(id) {
      this.$router.push({
        name: 'AuthorArticle',
        params: {
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
    display: flex;
    margin-bottom: 0.1rem;
    height: 34px;

    .btn {
      margin: 0.2em 0 0 1em;
    }

    .btn.edit-button {
      margin-left: auto;
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
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
  }
</style>