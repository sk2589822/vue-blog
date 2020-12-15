<template>
  <li class="article">
    <img
      class="article-item author-photo"
      :src="authorPhoto"
    >
    <router-link
      class="article-item article-author"
      :to="{ name: 'AuthorPage', params: { account: article.author } }"
    >
      {{ article.author }}
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
    <span class="article-item article-preview">
      {{ articlePreview }}
    </span>
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
      authorPhoto: '',
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.article.postDate).format('yyyy年MM月dd日 hh:mm')
    },
    articlePreview() {
      const previewLength = 50
      return this.article.content.slice(0, previewLength)
    },
  },
  created() {
    this.getAuthorPhoto(this.article.author)
  },
  methods: {
    getAuthorPhoto: async function(author) {
      const authorRef = db.collection('Users').doc(author)
      const authorDoc = await authorRef.get()
      const authorData = authorDoc.data()

      if (authorData.photoSrc) {
        this.authorPhoto = authorData.photoSrc
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .article {
    display: grid;
    grid-template-rows: auto auto min-content 1fr;
    grid-template-columns: 50px 1fr;
    padding: 15px 15px 10px 15px;
    width: calc(100% / 3);
    height: 250px;
    border: 1px solid #ddd;
    border-top: none;
    border-left: none;

    &:nth-child(3n) {
      border-right: none;
    }
  }

  .article-item {
    overflow-wrap: break-word;
  }

  .author-photo {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    width: 45px;
    height: 45px;
    border-radius: 50%;
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
  }
</style>