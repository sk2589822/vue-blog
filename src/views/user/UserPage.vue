<template>
  <div>
    <TheUserSection />
    <section class="grid-container contents">
      <router-view class="grid-main" />
      <TheUserSidebar class="grid-sidebar" />
    </section>
  </div>
</template>

<script>
import TheUserSection from '@/components/user/TheUserSection'
import TheUserSidebar from '@/components/user/TheUserSidebar'

export default {
  components: {
    TheUserSection,
    TheUserSidebar,
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

  .grid-main {
    display: grid;
    grid-column: 1/2;
  }
</style>