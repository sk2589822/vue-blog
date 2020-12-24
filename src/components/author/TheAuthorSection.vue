<template>
  <section class="author-section">
    <div class="author-section-contents">
      <div class="author-img-container">
        <img
          class="author-img"
          :src="authorBannerSrc"
          alt="圖呢"
        >
      </div>
      <nav class="author-nav">
        <ul class="author-nav-list">
          <li class="author-nav-item">
            <router-link
              :to="`/author/${authorAccount}/profile`"
              :class="{ 'is-current': currentNav === 'profile' }"
            >
              個人檔案
            </router-link>
          </li>
          <li class="author-nav-item">
            <router-link
              :to="`/author/${authorAccount}/`"
              :class="{ 'is-current': currentNav === 'articles' }"
            >
              文章列表
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      authorAccount: state => state.author.authorInfo.account,
      authorBannerSrc: state => state.author.authorInfo.bannerSrc,
    }),
    currentNav() {
      if (this.$route.name === 'AuthorProfile') {
        return 'profile'
      } else {
        return 'articles'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .author-section {
    margin-top: 15px;
  }

  .author-section-contents {
    margin: 0 auto;
    background-color: #fff;
    width: 100%;
  }

  .author-img-container {
    position: relative;
    width: 100%;
    overflow: hidden;

    &::before {
      display: block;
      padding-top: 33.3333%;
      width: 100%;
      content: '';
    }
  }

  .author-img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .author-nav-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #ddd;
    border-top: 0;
  }

  .author-nav-item {
    width: 150px;
    list-style: none;

    a {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      height: 50px;
      color: #777;

      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
        background-color: transparent;
        width: 0;
        height: 3px;
        content: '';
      }
    }

    &:hover {
      a {
        color: #238ac5;

        &::after {
          transition: width 0.2s ease;
          background-color: #238ac5;
          width: 100%;
        }
      }
    }
  }

  .is-current {
    color: #238ac5;

    &::after {
      transition: width 0.2s ease;
      background-color: #238ac5;
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) {
    .author-section-contents {
      max-width: 990px;
    }
  }
</style>