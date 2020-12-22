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

<style lang="scss" scoped >
  .contents {
    margin: auto;
    padding: 15px 12px;
    width: 100%;
    max-width: 990px;
  }
</style>