<template>
  <section class="profile-section">
    <!-- prevent components initializing brefore data loaded -->
    <template v-if="isDataLoaded">
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
      <UserProfileField
        field-name="暱稱"
        :field-value.sync="userNickname"
        :is-editing="isEditing"
        :tag="'input'"
      />
      <template v-if="isEditing">
        <UserProfileField
          v-for="(info, index) in 3"
          :key="index"
          :field-name="`側邊欄資訊 ${index + 1}`"
          :field-value.sync="userSidebarInfo[index]"
          :is-editing="isEditing"
          :tag="'input'"
        />
        <UserProfileField
          field-name="橫幅圖片網址"
          :field-value.sync="userBannerSrc"
          :is-editing="isEditing"
          :tag="'input'"
          help-message="幫我把圖片網址貼上來，上傳圖片晚點做"
        />
        <UserProfileField
          field-name="大頭貼圖片網址"
          :field-value.sync="userPhotoSrc"
          :is-editing="isEditing"
          :tag="'input'"
          :help-message="'請看上面的問號'"
        />
      </template>
      <UserProfileField
        field-name="自我介紹"
        :field-value.sync="userIntroduce"
        class="introduce"
        :is-editing="isEditing"
        :tag="'textarea'"
      />
      <b-button
        v-if="isMyPage"
        v-show="isEditing"
        variant="primary"
        class="confirm-button"
        @click="updateUserProfile"
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
    </template>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { db } from '@/store/firebase.js'
import UserProfileField from '@/components/user/UserProfileField'

// TODO: store images itself instead of store the url of images
// TODO: reload images after update

export default {
  components: {
    UserProfileField,
  },
  data() {
    return {
      isDataLoaded: false,
      isEditing: false,
      userNickname: '',
      userSidebarInfo: [],
      userBannerSrc: '',
      userPhotoSrc: '',
      userIntroduce: '',
      originData: [],
    }
  },
  computed: {
    ...mapState({
      account: state => state.user.userInfo.account,
    }),
    isMyPage() {
      if (this.account !== undefined) {
        return this.account === this.$route.params.account
      }
      return false
    },
  },
  created() {
    this.getProfileData()
  },
  methods: {
    getProfileData: async function() {
      const userRef = db.collection('Users').doc(this.$route.params.account)
      const userDoc = await userRef.get()
      if (userDoc.exists) {
        this.isDataLoaded = true
        const userData = userDoc.data()

        this.userNickname = userData.nickname
        this.userSidebarInfo = userData.sidebarInfo
        this.userBannerSrc = userData.bannerSrc
        this.userPhotoSrc = userData.photoSrc
        this.userIntroduce = userData.introduce

        this.originData = userData
      }
    },
    updateUserProfile: async function() {
      const userRef = db.collection('Users').doc(this.$route.params.account)
      await userRef.update({
        nickname: this.userNickname,
        sidebarInfo: this.userSidebarInfo,
        bannerSrc: this.userBannerSrc,
        photoSrc: this.userPhotoSrc,
        introduce: this.userIntroduce,
      })
      this.isEditing = false
    },
    cancelEdit() {
      this.userNickname = this.originData.nickname
      this.userSidebarInfo = this.originData.sidebarInfo
      this.userBannerSrc = this.originData.bannerSrc
      this.userPhotoSrc = this.originData.photoSrc
      this.userIntroduce = this.originData.introduce

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
    width: 90%;
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