<template>
  <div>
    <template v-if="isAuthorExists">
      <TheAuthorSection />
      <section class="grid-container contents">
        <router-view class="grid-main" />
        <TheAuthorSidebar :class="['grid-sidebar', { 'show': needShowSidebar }]" />
      </section>
    </template>
    <template v-else-if="isDataFetched">
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
      currentTab: '',
      isDataFetched: false,
    }
  },
  computed: {
    ...mapGetters([
      'isAuthorExists',
    ]),
    authorAccount() {
      return this.$route.params.account
    },
    needShowSidebar() {
      return this.$route.name === 'AuthorProfile'
    },
  },
  watch: {
    authorAccount() {
      this.fetchAuthorInfo()
    },
  },
  mounted() {
    this.fetchAuthorInfo()
  },
  methods: {
    fetchAuthorInfo() {
      const account = this.$route.params.account
      this.$store.dispatch('fetchAuthorInfo', {
        account,
      }).then(() => {
        this.isDataFetched = true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .contents {
    margin: auto;
    padding: 15px 12px;
    width: 100%;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    align-items: center;
  }

  .grid-main {
    grid-row: 3 / 6;
  }

  .grid-sidebar {
    display: none;
    grid-row: 1 / 2;

    &.show {
      display: block;
    }
  }

  .author-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }

  @media screen and (min-width: 768px) {
    .contents {
      padding: 15px 0;
    }

    .latest-articles {
      width: auto;
      height: auto;
    }

    .grid-container {
      grid-template-columns: 1fr 275px;
      max-width: 990px;
    }

    .grid-main {
      grid-column: 1 / 2;
    }

    .grid-sidebar {
      display: block;
      grid-row: 3 / 4;
      grid-column: 2 / 3;
      margin-left: 15px;
    }
  }
</style>