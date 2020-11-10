<template>
  <div>
    <TheAuthorSection />
    <section class="contents">
      <router-view />
    </section>
  </div>
</template>

<script>
import TheAuthorSection from '@/components/author/TheAuthorSection'

export default {
  components: {
    TheAuthorSection,
  },
}
</script>

<style scoped lang="scss">
  .contents {
    margin: auto;
    padding: 15px 12px;
    width: 990px;
  }
</style>