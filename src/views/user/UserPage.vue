<template>
  <div>
    <template v-if="isUserExists">
      <TheUserSection />
      <section class="grid-container contents">
        <router-view />
        <TheUserSidebar class="grid-sidebar" />
      </section>
    </template>
    <template v-else>
      <div class="user-not-found">
        <h1>
          找不到這個人耶
        </h1>
      </div>
    </template>
  </div>
</template>

<script>
import { db } from '@/store/firebase.js'
import TheUserSection from '@/components/user/TheUserSection'
import TheUserSidebar from '@/components/user/TheUserSidebar'

export default {
  components: {
    TheUserSection,
    TheUserSidebar,
  },
  data() {
    return {
      isUserExists: true,
    }
  },
  created: async function() {
    const userRef = db.collection('Users').doc(this.$route.params.account)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      this.isUserExists = false
    }
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

  .user-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
</style>