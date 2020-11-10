<template>
  <div>
    <template v-if="isAuthorExists">
      <TheUserSection />
      <section class="grid-container contents">
        <router-view />
        <TheUserSidebar class="grid-sidebar" />
      </section>
    </template>
    <template v-else>
      <div class="user-not-found">
        <h1>
          找不到這個人耶
        </h1>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheUserSection from '@/components/user/TheUserSection'
import TheUserSidebar from '@/components/user/TheUserSidebar'

export default {
  components: {
    TheUserSection,
    TheUserSidebar,
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

  .user-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
</style>