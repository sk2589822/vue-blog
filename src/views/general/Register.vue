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
import sha512 from 'crypto-js/sha512'
import { db } from '@/store/firebase.js'

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
    register: async function() {
      const validationResult = this.validateSubmitData(this.account, this.password)
      if (!validationResult.result) {
        this.message = validationResult.message
        return
      }

      this.submitted = true

      const userRef = db.collection('Users').doc(this.account)
      const userDoc = await userRef.get()

      if (userDoc.exists) {
        this.message = '帳號已存在'
        this.submitted = false
      } else {
        await userRef.set({
          password: this.getHashedPassword(this.password),
        })

        this.$swal({
          icon: 'success',
          title:'註冊成功。',
          heightAuto: false,
        }).then(() => {
          this.$router.push({ name:'Login' })
        })
      }
    },
    validateSubmitData(account, password) {
      let result = true
      let message = ''

      if (account.length < 8) {
        message = '帳號不得小於8個字元'
        result = false
      } else if (password.length < 8) {
        message = '密碼不得小於8個字元'
        result = false
      }

      return {result, message}
    },
    getHashedPassword() {
      return sha512(this.password).toString()
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