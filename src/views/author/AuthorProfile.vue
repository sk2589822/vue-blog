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
import { mapActions, mapGetters, mapState } from 'vuex'
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
        pntroduce: '',
      },
    }
  },
  computed: {
    ...mapState({
      account: state => state.user.userInfo.account,
      authorAccount: state => state.author.authorInfo.account,
      authorNickname: state => state.author.authorInfo.nickname,
      authorIntroduce: state => state.author.authorInfo.introduce,
      authorSidebarInfo(state) {
        const sidebarInfo = state.author.authorInfo.sidebarInfo
        if (sidebarInfo === undefined) {
          return new Array(10).fill('')
        } else {
          return sidebarInfo
        }
      },
    }),
    ...mapGetters([
      'authorPhotoSrc',
      'authorBannerSrc',
    ]),
    isMyPage() {
      if (this.account !== undefined) {
        return this.account === this.authorAccount
      }
      return false
    },
  },
  mounted() {
    this.setAuthorInfo()
  },
  methods: {
    ...mapActions([
      'updateAuthorProfile',
    ]),
    submitAuthorProfile() {
      this.updateAuthorProfile({
        account: this.authorAccount,
        ...this.authorInfo,
      })

      this.isEditing = false
    },
    setAuthorInfo() {
      this.authorInfo = {
        nickname: this.authorNickname ? this.authorNickname : '',
        bannerSrc: this.authorBannerSrc ? this.authorBannerSrc : '',
        photoSrc: this.authorPhotoSrc ? this.authorPhotoSrc : '',
        introduce: this.authorIntroduce ? this.authorIntroduce : '',
        sidebarInfo: this.authorSidebarInfo?.length ? this.$_.cloneDeep(this.authorSidebarInfo) : '',
      }
    },
    cancelEdit() {
      this.setAuthorInfo()
      this.isEditing = false
    },
  },
}
</script>

<style scoped lang="scss">
  .profile-section {
    position: relative;
    margin: 0 0 15px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 30px 50px;
    background-color: #fff;
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