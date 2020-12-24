<template>
  <li class="article">
    <img
      class="article-item author-photo"
      :src="authorInfo.photoSrc"
    >
    <router-link
      class="article-item article-author"
      :to="{ name: 'AuthorPage', params: { account: article.author } }"
    >
      {{ authorInfo.nickname }}
    </router-link>
    <span class="article-item article-post-date">
      {{ formattedDate }}
    </span>
    <router-link
      class="article-item article-title"
      :to="{ name: 'AuthorArticle', params: { account: article.author, id: article.id } }"
    >
      {{ article.title }}
    </router-link>
    <span class="article-item article-preview">{{ articlePreview }}</span>
  </li>
</template>

<script>
import { db } from '@/store/firebase.js'

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      authorInfo: {
        nickname: '',
        photoSrc: '',
      },
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.article.postDate).format('yyyy年MM月dd日 hh:mm')
    },
    articlePreview() {
      const previewLength = 50
      let preview = this.article.content.slice(0, previewLength)
      if (this.article.content.length > previewLength) {
        preview += '......'
      }
      return preview
    },
  },
  created() {
    this.getAuthorInfo(this.article.author)
  },
  methods: {
    getAuthorInfo: async function(author) {
      const authorRef = db.collection('Users').doc(author)
      const authorDoc = await authorRef.get()
      const authorData = authorDoc.data()

      this.authorInfo.nickname = authorData.nickname
      this.authorInfo.photoSrc = authorData.photoSrc
    },
  },
}
</script>

<style lang="scss" scoped>
  .article {
    display: grid;
    grid-template-rows: auto auto min-content 1fr;
    grid-template-columns: 50px 1fr;
    border-bottom: 1px solid #ddd;
    padding: 15px 15px 10px;
    width: 100%;
    height: 300px;

    &:last-child {
      border-bottom: 0;
    }
  }

  .article-item {
    overflow-wrap: break-word;
  }

  .author-photo {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    border-radius: 50%;
    width: 45px;
    height: 45px;
  }

  .article-author {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }

  .article-post-date {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
  }

  .article-title {
    grid-row: 3 / 4;
    grid-column: 1 / 3;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .article-preview {
    grid-row: 4 / 5;
    grid-column: 1 / 3;
    overflow-y: hidden;
    white-space: pre-wrap;
  }

  @media screen and (min-width: 768px) {
    .article {
      border-right: 1px solid #ddd;
      width: calc(100% / 3);

      &:nth-child(3n+3) {
        border-right: 0;
      }

      &:nth-child(n+4) {
        border-bottom: 0;
      }
    }
  }
</style>