<template>
  <header>
    <b-navbar
      toggleable="lg"
      type="dark"
    >
      <b-navbar-brand href="#">
        JKBlog
      </b-navbar-brand>

      <b-navbar-nav
        v-if="isLoggedIn"
        class="ml-auto"
      >
        <b-nav-item @click="logout">
          登出
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav
        v-else
        class="ml-auto"
      >
        <b-nav-item to="/Login">
          登入
        </b-nav-item>
        <b-nav-item to="/Register">
          註冊
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      account: state => state.user.userInfo.account,
    }),
    ...mapGetters([
      'isLoggedIn',
    ]),
  },
  methods: {
    logout() {
      this.$cookies.remove('session_id')
      this.$store.dispatch('logout', {
        account: this.account,
      })
    },
  },
}
</script>

<style scoped lang="scss">
  .navbar {
    height: 5vh;
    background-color: #222;
  }
</style>