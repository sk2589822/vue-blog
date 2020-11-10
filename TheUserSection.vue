<template>
  <section class="author-section">
    <div class="author-section-contents">
      <div class="author-img-container">
        <img
          class="author-img"
          :src="imgSrc"
          alt="圖呢"
        >
      </div>
      <nav class="author-nav">
        <ul class="author-nav-list">
          <li class="author-nav-item">
            <router-link to="/authors/skink/profile">
              個人檔案
            </router-link>
          </li>
          <li class="author-nav-item">
            <router-link to="/authors/skink/">
              文章列表
            </router-link>
          </li>
        </ul>
      </nav>
      <router-view />
      <section class="grid-container contents">
        <TheAuthorSidebar class="grid-sidebar" />
      </section>
    </div>
  </section>
</template>

<script>
import TheAuthorSidebar from '@/components/author/TheAuthorSidebar'

export default {
  components: {
    TheAuthorSidebar,
  },
  data() {
    return {
      imgSrc: 'https://imgur.com/uAdL6ix.jpg',
    }
  },
  methods: {
  },
}
</script>

<style scoped lang="scss">
  .author-section {
    margin-top: 15px;
  }

  .author-section-contents {
    margin: 0 auto;
    width: 990px;
    background-color: #fff;
  }

  .author-img-container {
    height: 330px;
  }

  .author-img {
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