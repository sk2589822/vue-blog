<template>
  <div class="container">
    <div class="card">
      <form
        class="form"
        @submit.prevent=""
      >
        <h3 class="title">
          登入
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
            @keypress.enter="login"
          />
        </div>
        <div>
          <b-button
            v-if="!submitted"
            block
            variant="primary"
            @click="login"
          >
            登入
          </b-button>
          <div
            v-if="submitted"
            class="text-center"
          >
            <b-spinner variant="primary" />
          </div>
        </div>
        <p class="foot-links">
          <a
            href=""
            @click.prevent="forgetPassword"
          >
            忘記密碼
          </a>
          <router-link to="Register">
            註冊
          </router-link>
        </p>
        <p
          v-if="message !== ''"
          class="message"
        >
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  data() {
    return {
      account: '',
      password: '',
      message: '',
      submitted: false,
    }
  },
  methods: {
    forgetPassword() {
      this.$swal({
        title: '抱歉',
        text: '我還沒做',
      })
    },
    getHashedPassword() {
      return CryptoJS.SHA512(this.password).toString()
    },
    login() {
      this.submitted = true

      this.$store.dispatch('login', {
        account: this.account,
        password: this.getHashedPassword(this.password),
      }).then(sessionId => {
        this.$cookies.set('session_id', sessionId, 60 * 60) // stroe cookie for 1 hour
        this.$router.push({
          name:'AuthorPage',
          params: {
            account: this.account,

          },
        })
      }).catch(message => {
        this.message = message
      }).finally(() => {
        this.submitted = false
      })
    },
    getEncryptedData(val, key) {
      const stringifiedUserInfo = JSON.stringify(val)
      return  CryptoJS.AES.encrypt(stringifiedUserInfo, key).toString()
    },
  },
}
</script>

<style lang="scss" scoped >
  .container {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .card {
    display: flex;
    margin: auto;
    padding: 50px 70px;
    width: 450px;
    height: auto;
    background: rgba(250, 250, 250, 0.92);
    box-shadow: 0px 4px 3px rgba(106, 131, 134, 0.1);
  }

  .title {
    text-align: center;
  }

  .input-container {
    margin: 10px 0;

    .form-control {
      border: 1px solid #d9d9d9;

      &:focus {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
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
    text-align: center;
    font-weight: bold;
    color: #f00;
  }
</style>