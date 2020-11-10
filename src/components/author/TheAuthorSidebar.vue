<template>
  <aside class="sidebar-container">
    <div class="sidebar">
      <ul class="sidebar-list">
        <li class="sidebar-item author-info">
          <p class="author-photo-container">
            <img
              class="author-photo"
              :src="authorPhotoSrc"
            >
          </p>
        </li>
        <li class="sidebar-item latest-articles" />
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'authorPhotoSrc',
    ]),
  },
}
</script>

<style scoped lang="scss">
  .sidebar-container{
    margin: 10px auto auto auto;
  }

  .sidebar-item {
    list-style: none;
  }

  .author-photo-container {
    margin: auto;
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