<template>
  <aside>
    <div class="sidebar">
      <ul class="sidebar-list">
        <li class="sidebar-item">
          <p class="author-photo-container">
            <img
              class="author-photo"
              :src="authorPhotoSrc"
            >
          </p>
        </li>
        <li class="sidebar-item">
          <h2>
            {{ authorNickname }}
          </h2>
        </li>
        <li
          v-for="(item, index) in authorSidebarInfo"
          :key="index"
          class="sidebar-item"
        >
          {{ item }}
        </li>
        <li class="sidebar-item latest-articles" />
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      authorNickname: state => state.author.authorInfo.nickname,
      authorSidebarInfo: state => state.author.authorInfo.sidebarInfo,
      authorPhotoSrc: state => state.author.authorInfo.photoSrc,
    }),
  },
}
</script>

<style lang="scss" scoped>
  .sidebar {
    position: relative;
    margin: 0 0 15px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: #fff;
  }

  .sidebar-item {
    list-style: none;
    text-align: center;
    overflow-wrap: break-word;
  }

  .author-photo-container {
    margin: 10px auto;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    overflow: hidden;
  }

  .author-photo {
    width: 100%;
    height: 100%;
  }
</style>