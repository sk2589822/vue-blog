<template>
  <header>
    <b-navbar
      toggleable="lg"
      type="dark"
    >
      <b-navbar-brand :to="{ name: 'Home'}">
        JKBlog
      </b-navbar-brand>
      <TheAuthorList class="ml-auto mr-2" />
      <b-navbar-nav v-if="isLoggedIn">
        <router-link
          class="user-icon"
          :to="{ name: 'AuthorPage', params: { account: userAccount } }"
        >
          <img :src="userPhotoSrc">
        </router-link>
        <b-nav-item @click="logout">
          登出
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else>
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
import TheAuthorList from '@/components/general/TheAuthorList'

export default {
  components: {
    TheAuthorList,
  },
  computed: {
    ...mapState({
      userAccount: state => state.user.userInfo.account,
      userPhotoSrc: state => state.user.userInfo.photoSrc,
    }),
    ...mapGetters([
      'isLoggedIn',
    ]),
  },
  methods: {
    logout() {
      this.$cookies.remove('session_id')
      this.$store.dispatch('logout', {
        account: this.userAccount,
      })
    },
  },
}
</script>

<style lang="scss" scoped >
  .navbar {
    height: 5vh;
    background-color: #222;
  }

  .user-icon {
    margin: auto;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      border-radius: 20px;
    }
  }
</style>