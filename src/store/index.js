import Vue from 'vue'
import Vuex from 'vuex'

import { db } from './firebase.js'
import _ from 'lodash'

Vue.use(Vuex)

const moduleUser = {
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo: (state, { account }) => {
      state.userInfo = {
        account,
      }
    },
    logout: state => {
      state.userInfo = {}
    },
  },
  actions: {
    login: async ({ commit }, { account, password }) => {
      const randomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length

        return [...Array(length)].map(() => {
          return characters.charAt(Math.floor(Math.random() * charactersLength))
        }).join('')
      }

      let authenticationSuccess = false
      const userRef = db.collection('Users').doc(account)
      const userDoc = await userRef.get()

      let sessionId
      if (userDoc.exists && password === userDoc.data().password) {
        sessionId = randomString(64)
        userRef.set({
          sessionId,
        }, { merge: true })

        authenticationSuccess = true

        commit('setUserInfo', { account })
      }

      return new Promise((resolve, reject) => {
        if (authenticationSuccess) {
          resolve(sessionId)
        } else {
          reject('帳號或密碼錯誤')
        }
      })
    },
    checkSession: async ({ commit }, { sessionId }) => {
      if (!_.isEmpty(sessionId)) {
        const userSnapshot = await db
          .collection('Users')
          .where('sessionId', '==', sessionId)
          .get()

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0]
          if (sessionId === userDoc.data().sessionId) {
            commit('setUserInfo', { account: userDoc.id })
          }
        }
      }
    },
    logout: ({ commit }, { account }) => {
      const userRef = db.collection('Users').doc(account)

      userRef.update({
        sessionId: null,
      })

      commit('logout')
    },
  },
  getters: {
    isLoggedIn: state => !_.isEmpty(state.userInfo),
  },
}

const moduleArticle = {
  state: {
    articles: [],
  },
  mutations: {
    fetchArticles: (state, payload) => {
      state.articles = payload
    },
  },
  actions: {
    fetchArticles: async ({ commit }, { account }) => {
      const articles = await db
        .collection('Articles')
        .where('user', '==', account)
        .orderBy('postDate', 'desc')
        .get()

      let payload = []
      articles.forEach(article => {
        payload.push({
          id: article.id,
          ...article.data(),
        })
      })

      commit('fetchArticles', payload)
    },
  },
  getters: {
    getArticleById: state => id => state.articles.find(article => article.id === id),
  },
}

export default new Vuex.Store({
  modules: {
    user: moduleUser,
    article: moduleArticle,
  },
})