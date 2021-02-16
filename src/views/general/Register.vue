<template>
  <div class="container">
    <div class="card">
      <form
        class="form"
        @submit.prevent=""
      >
        <h3 class="title">
          註冊
        </h3>
        <div class="input-container">
          <b-form-input
            v-model="account"
            type="text"
            placeholder="帳號"
          />
        </div>
        <div class="input-container">
          <b-form-input
            v-model="password"
            type="password"
            placeholder="密碼"
            @keypress.enter="register"
          />
        </div>
        <b-alert
          v-show="errorMessage.length"
          show
          variant="danger"
        >
          {{ errorMessage }}
        </b-alert>
        <div>
          <b-button
            v-if="!submitted"
            block
            variant="primary"
            @click="register"
          >
            註冊
          </b-button>
          <div
            v-if="submitted"
            class="text-center"
          >
            <b-spinner variant="primary" />
          </div>
        </div>
        <p class="foot-links">
          <router-link to="Login">
            已有帳號
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import sha512 from 'crypto-js/sha512'
import { db } from '@/store/firebase.js'

export default {
  data() {
    return {
      account: '',
      password: '',
      errorMessage: '',
      submitted: false,
    }
  },
  methods: {
    register: async function() {
      if (!this.validateSubmitData()) {
        return
      }
      this.submitted = true

      const userRef = db.collection('Users').doc(this.account)
      const userDoc = await userRef.get()

      if (userDoc.exists) {
        this.errorMessage = '帳號已存在'
        this.submitted = false
      } else {
        await userRef.set({
          password: this.getHashedPassword(this.password),
          nickname: this.account,
          photoSrc: 'https://i.imgur.com/VsCn3nL.png',
          bannerSrc: 'https://i.imgur.com/v3WqLYF.png',
        })

        this.$swal({
          icon: 'success',
          title:'註冊成功。',
        }).then(() => {
          this.$router.push({ name:'Login' })
        })
      }
    },
    validateSubmitData() {
      const validateLength = lowerBound => value => value.length > lowerBound
      const validateCharacters = value => /^[a-zA-z0-9]+$/.test(value)

      const itemsNeedValidation = [
        {
          value: this.account,
          validateMethod: validateLength(3),
          errorMessage: '帳號至少要有4個字元',
        },
        {
          value: this.account,
          validateMethod: validateCharacters,
          errorMessage: '帳號只能為英文或數字',
        },
        {
          value: this.password,
          validateMethod: validateLength(3),
          errorMessage: '密碼至少要有4個字元',
        },
        {
          value: this.password,
          validateMethod: validateCharacters,
          errorMessage: '密碼只能為英文或數字',
        },
      ]

      const result = itemsNeedValidation.every(item => {
        if (!item.validateMethod(item.value)) {
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
    getHashedPassword() {
      return sha512(this.password).toString()
    },
  },
}
</script>


<style lang="scss" scoped>
  .container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .card {
    display: flex;
    margin: auto;
    box-shadow: 0 4px 3px rgba(106, 131, 134, 0.1);
    background: rgba(250, 250, 250, 0.92);
    padding: 50px 70px;
    width: 450px;
    height: auto;
  }

  .title {
    text-align: center;
  }

  .input-container {
    margin: 10px 0;

    .form-control {
      border: 1px solid #d9d9d9;

      &:focus {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .foot-links {
    margin-top: 5px;
    text-align: right;

    a {
      margin-left: 5px;
      font-size: 15px;
    }
  }

  .message {
    color: #f00;
    font-weight: bold;
    text-align: center;
  }
</style>