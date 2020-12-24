<template>
  <section class="profile-section">
    <b-button
      v-if="isMyPage"
      v-show="!isEditing"
      variant="primary"
      size="sm"
      class="edit-button"
      @click="isEditing = true"
    >
      🖉
    </b-button>
    <AuthorProfileField
      field-name="暱稱"
      :field-value.sync="authorInfo.nickname"
      :is-editing="isEditing"
      :tag="'input'"
    />
    <template v-if="isEditing">
      <AuthorProfileField
        v-for="(info, index) in 3"
        :key="index"
        :field-name="`側邊欄資訊 ${index + 1}`"
        :field-value.sync="authorInfo.sidebarInfo[index]"
        :is-editing="isEditing"
        :tag="'input'"
      />
      <AuthorProfileField
        field-name="橫幅圖片網址"
        :field-value.sync="authorInfo.bannerSrc"
        :is-editing="isEditing"
        :tag="'input'"
        help-message="幫我把圖片網址貼上來，上傳圖片晚點做"
      />
      <AuthorProfileField
        field-name="大頭貼圖片網址"
        :field-value.sync="authorInfo.photoSrc"
        :is-editing="isEditing"
        :tag="'input'"
        :help-message="'請看上面的問號'"
      />
    </template>
    <AuthorProfileField
      field-name="自我介紹"
      :field-value.sync="authorInfo.introduce"
      class="introduce"
      :is-editing="isEditing"
      :tag="'textarea'"
    />
    <b-alert
      v-show="errorMessage.length"
      show
      variant="danger"
    >
      {{ errorMessage }}
    </b-alert>
    <b-button
      v-if="isMyPage"
      v-show="isEditing"
      variant="primary"
      class="confirm-button"
      @click="submitAuthorProfile"
    >
      儲存
    </b-button>
    <b-button
      v-if="isMyPage"
      v-show="isEditing"
      class="cancel-button"
      @click="cancelEdit"
    >
      取消
    </b-button>
  </section>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AuthorProfileField from '@/components/author/AuthorProfileField'

// TODO: store images itself instead of store the url of images
// TODO: reload images after update

export default {
  components: {
    AuthorProfileField,
  },
  data() {
    return {
      isEditing: false,
      authorInfo: {
        nickname: '',
        sidebarInfo: '',
        bannerSrc: '',
        photoSrc: '',
        introduce: '',
      },
      errorMessage: '',
    }
  },
  computed: {
    ...mapState({
      account: state => state.user.userInfo.account,
      authorAccount: state => state.author.authorInfo.account,
      authorNickname: state => state.author.authorInfo.nickname,
      authorIntroduce: state => state.author.authorInfo.introduce,
      authorPhotoSrc: state => state.author.authorInfo.photoSrc,
      authorBannerSrc: state => state.author.authorInfo.bannerSrc,
      authorSidebarInfo(state) {
        const sidebarInfo = state.author.authorInfo.sidebarInfo
        if (sidebarInfo === undefined) {
          return new Array(10).fill('')
        } else {
          return sidebarInfo
        }
      },
    }),
    isMyPage() {
      if (this.account !== undefined) {
        return this.account === this.authorAccount
      }
      return false
    },
  },
  mounted() {
    this.loadAuthorInfo()
  },
  methods: {
    ...mapActions([
      'updateAuthorProfile',
    ]),
    submitAuthorProfile() {
      if (!this.validateProfileData()) {
        return
      }
      this.isEditing = false

      this.updateAuthorProfile(this.$_.cloneDeep({
        account: this.authorAccount,
        ...this.authorInfo,
      }))
    },
    validateProfileData() {
      const itemsNeedValidation = [
        {
          value: this.authorInfo.nickname,
          errorMessage: '請輸入暱稱',
        },
        {
          value: this.authorInfo.bannerSrc,
          errorMessage: '請輸入橫幅圖片網址',
        },
        {
          value: this.authorInfo.photoSrc,
          errorMessage: '請輸入大頭貼圖片網址',
        },
      ]

      const result = itemsNeedValidation.every(item => {
        if (this.$_.isEmpty(item.value)) {
          this.errorMessage = item.errorMessage
          return false
        } else {
          return true
        }
      })

      if (result) {
        this.errorMessage = ''
      }

      return result
    },
    loadAuthorInfo() {
      this.authorInfo = {
        nickname: this.authorNickname,
        bannerSrc: this.authorBannerSrc,
        photoSrc: this.authorPhotoSrc,
        introduce: this.authorIntroduce ? this.authorIntroduce : '',
        sidebarInfo: this.authorSidebarInfo?.length ? this.$_.cloneDeep(this.authorSidebarInfo) : '',
      }
    },
    cancelEdit() {
      this.loadAuthorInfo()
      this.isEditing = false
    },
  },
}
</script>

<style lang="scss" scoped>
  .profile-section {
    position: relative;
    margin: 0 0 15px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: #fff;
    padding: 30px 50px;
  }

  .edit-button {
    position: absolute;
    top: 20px;
    right: 25px;
  }

  .confirm-button {
    margin-right: 3%;
    width: 67%;
  }

  .cancel-button {
    width: 30%;
  }
</style>