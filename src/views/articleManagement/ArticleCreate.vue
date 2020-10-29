<template>
  <articleEditor>
    <template #actionName>
      發表文章
    </template>
  </articleEditor>
</template>

<script>
import articleEditor from '@/components/articleManagement/TheArticleEditor'
import { mapGetters } from 'vuex'

export default {
  components: {
    articleEditor,
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ]),
  },
  watch: {
    isLoggedIn(val) {
      if (!val) {
        this.backToArticles()
      }
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.backToArticles()
    }
  },
  methods: {
    backToArticles() {
      this.$router.push({ name: 'UserArticles' })
    },
  },
}
</script>