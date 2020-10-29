<template>
  <section class="user-section">
    <div class="user-section-contents">
      <div class="user-img-container">
        <img
          class="user-img"
          :src="userBannerSrc"
          alt="圖呢"
        >
      </div>
      <nav class="user-nav">
        <ul class="user-nav-list">
          <li class="user-nav-item">
            <router-link to="/users/skink/profile">
              個人檔案
            </router-link>
          </li>
          <li class="user-nav-item">
            <router-link to="/users/skink/">
              文章列表
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import { db } from '@/store/firebase.js'

export default {
  data() {
    return {
      userBannerSrc: '',
    }
  },
  created() {
    this.getUserBannerSrc()
  },
  methods: {
    getUserBannerSrc: async function() {
      const userRef = db.collection('Users').doc(this.$route.params.account)
      const userDoc = await userRef.get()

      if (userDoc?.data()?.bannerSrc) {
        this.userBannerSrc = userDoc.data().bannerSrc
      } else {
        this.userBannerSrc = 'https://i.imgur.com/v3WqLYF.png'
      }
    },
  },
}
</script>

<style scoped lang="scss">
  .user-section {
    margin-top: 15px;
  }

  .user-section-contents {
    margin: 0 auto;
    width: 990px;
    background-color: #fff;
  }

  .user-img-container {
    height: 330px;
  }

  .user-img {
    width: 100%;
    height: 100%;
  }

  .user-nav-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #ddd;
    border-top: 0;
  }

  .user-nav-item {
    width: 150px;
    list-style: none;

    a {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      color: #777;

      &:after {
        background-color: transparent;
        content: '';
        width: 0;
        height: 3px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
      }

      &.router-link-active {
        color: #238ac5;

        &:after {
          background-color: #238ac5;
          width: 100%;
          transition: width .2s ease;
        }
      }
    }

    &:hover {
      a {
        color: #238ac5;

        &:after {
          background-color: #238ac5;
          width: 100%;
          transition: width .2s ease;
        }
      }
    }
  }
</style>