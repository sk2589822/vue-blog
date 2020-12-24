<template>
  <form
    class="form"
    @submit.prevent
  >
    <div class="editor">
      <label for="title">標題：</label>
      <b-form-input
        id="title"
        v-model="article.title"
        placeholder="請輸入標題"
        lazy
      />
      <label for="content">內容：</label>
      <b-form-textarea
        id="content"
        v-model="article.content"
        class="article-content"
        placeholder="請輸入文章內容"
        rows="20"
        no-resize
        lazy
      />
    </div>
    <b-alert
      v-show="errorMessage.length"
      show
      variant="danger"
    >
      {{ errorMessage }}
    </b-alert>
    <p class="editor-functions">
      <b-button
        variant="primary"
        :disabled="submitted"
        @click.prevent="submitArticleData"
      >
        <b-spinner
          v-if="submitted"
          small
        />
        <slot name="actionName" />
      </b-button>
      <b-button
        variant="danger"
        @click.prevent="backToArticles"
      >
        取消
      </b-button>
    </p>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { db } from '@/store/firebase.js'

export default {
  data() {
    return {
      mode: '',
      id: '',
      article: {
        title: '',
        content: '',
      },
      submitted: false,
      errorMessage: '',
    }
  },
  computed: {
    ...mapState({
      account: state => state.user.userInfo.account,
    }),
    ...mapGetters([
      'getArticleById',
    ]),
  },
  mounted() {
    this.mode = this.$route.name === 'ArticleEdit' ? 'edit' : 'create'
    if (this.mode === 'edit') {
      this.id = this.$route.params.id
      this.article = this.getArticleById(this.id)
    }
  },
  methods: {
    ...mapActions([
      'fetchArticles',
    ]),
    submitArticleData() {
      if (!this.validateArticleData()) {
        return
      }
      this.submitted = true

      let title = ''
      if (this.mode === 'create') {
        this.addArticle()
        title = '文章已發表。'
      } else {
        this.modifyArticle()
        title = '文章已修改。'
      }

      this.fetchArticles({ account: this.account })

      this.$swal({
        icon: 'success',
        title: title,
      }).then(() => {
        this.backToArticles()
      })
    },
    addArticle: async function() {
      this.article.postDate = new Date().getTime()

      const ref = db.collection('Articles')
      const account = this.account
      const info = {
        author: account,
        ...this.article,
      }
      await ref.add(info)
    },
    modifyArticle: async function() {
      this.article.lastModifyDate = new Date().getTime()

      const docRef = db.collection('Articles').doc(this.id)
      await docRef.update(this.article)
    },
    validateArticleData() {
      const itemsNeedValidation = [
        {
          value: this.article.title,
          errorMessage: '請輸入標題',
        },
        {
          value: this.article.content,
          errorMessage: '請輸入文章內容',
        },
      ]

      const result = itemsNeedValidation.every(item => {
        if (this.$_.isEmpty(item.value)) {
          this.errorMessage = item.errorMessage
          return false
        } else {
          return true
        }
      })

      if (result) {
        this.errorMessage = ''
      }

      return result
    },
    backToArticles() {
      this.$router.push({
        name: 'AuthorArticles',
        params: {
          account: this.account,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .form {
    margin-bottom: 100px;
  }

  .editor {
    margin-bottom: 20px;
  }

  .article-content {
    overflow: auto;
  }

  .editor-functions {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    margin-left: 10px;
  }
</style>