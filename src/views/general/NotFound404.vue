<template>
  <div>
    <h1>
      網址怪怪的喔
    </h1>
    <input
      type="button"
      value="回上一頁"
      @click="goBack"
    >
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>