<template>
  <div>
    <template v-if="isAuthorExists">
      <TheAuthorSection />
      <section class="grid-container contents">
        <router-view />
        <TheAuthorSidebar class="grid-sidebar" />
      </section>
    </template>
    <template v-else>
      <div class="author-not-found">
        <h1>
          找不到這個人耶
        </h1>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheAuthorSection from '@/components/author/TheAuthorSection'
import TheAuthorSidebar from '@/components/author/TheAuthorSidebar'

export default {
  components: {
    TheAuthorSection,
    TheAuthorSidebar,
  },
  data() {
    return {
      dataFetched: false,
    }
  },
  computed: {
    ...mapGetters([
      'isAuthorExists',
    ]),
  },
  mounted() {
    this.fetchAuthorInfo()
  },
  methods: {
    fetchAuthorInfo() {
      const account = this.$route.params.account
      this.$store.dispatch('fetchAuthorInfo', {
        account,
      })
    },
  },
}
</script>

<style scoped lang="scss">
  .contents {
    padding: 15px 12px;
    width: 100%
  }

  .grid-container {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 700px 290px;
  }

  .author-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
</style>