<template>
  <b-nav-form
    class="author-list-container"
    @submit.prevent
  >
    <b-form-input
      v-model="searchInput"
      class="author-search"
      placeholder="請輸入帳號或暱稱"
      autocomplete="off"
      @focus="isFocusing = true"
      @blur="isFocusing = false"
    />
    <div
      v-show="showAuthorList"
      class="author-search-result"
      @mouseenter="hoveringList = true"
      @mouseleave="hoveringList = false"
    >
      <ul class="author-search-result-list">
        <template v-if="searchResult.length == 0">
          <li class="author-search-result-item no-result">
            找不到東西耶
          </li>
        </template>
        <template v-else>
          <li
            v-for="(authorInfo, index) in searchResult"
            :key="index"
            class="author-search-result-item"
            @click="routerToAuthor(authorInfo.account)"
          >
            <img
              :src="authorInfo.photoSrc"
              class="author-search-result-image"
            >
            <span class="author-search-result-account">{{ `${authorInfo.nickname} (${authorInfo.account})` }}</span>
          </li>
        </template>
      </ul>
    </div>
  </b-nav-form>
</template>

<script>
import { db } from '@/store/firebase.js'

export default {
  data() {
    return {
      focusingInput: false,
      hoveringList: false,
      authors: [],
      searchInput: '',
    }
  },
  computed: {
    searchResult() {
      return this.authors.filter(authorInfo => {
        return authorInfo.account.includes(this.searchInput) ||
          authorInfo.nickname.includes(this.searchInput)
      })
    },
    showAuthorList() {
      return this.hoveringList || (this.searchInput.length && this.isFocusing)
    },
  },
  mounted() {
    this.getAuthors()
      .then(data => this.authors = data)
  },
  methods: {
    getAuthors: async function() {
      const authorsRef = await db.collection('Users').get()
      return authorsRef.docs.map(doc => {
        return {
          account: doc.id,
          nickname: doc.data().nickname,
          photoSrc: doc.data().photoSrc,
        }
      })
    },
    routerToAuthor(account) {
      this.searchInput = ''
      this.hoveringList = false

      this.$router.push({
        name: 'AuthorPage',
        params: { account },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .author-list-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 300px;

    form {
      width: 100%;

      .author-search,
      .author-search:focus {
        width: 100%;
        border-radius: 19px;
        background: #444;
        color: #fff;

        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

  .author-search-result {
    position: absolute;
    top: 100%;
    width: 100%;
    max-height: 200px;
    background: #444;
    overflow-y: auto;
  }

  .author-search-result-list {
    margin-bottom: 0;
  }

  .author-search-result-item {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 50px;
    border-bottom: #000 solid 1px;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #555;
    }

    &.no-result {
      justify-content: center;
      background: #444;
      color: #fff;
      cursor: initial;
    }
  }

  .author-search-result-image {
    margin: 0 10px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }

  .author-search-result-account {
    color: #fff;
  }
</style>