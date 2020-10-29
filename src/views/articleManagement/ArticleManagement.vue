<template>
  <div>
    <TheUserSection />
    <section class=" contents">
      <router-view />
    </section>
  </div>
</template>

<script>
import TheUserSection from '@/components/user/TheUserSection'

export default {
  components: {
    TheUserSection,
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