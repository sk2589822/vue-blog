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
    setUserInfo: (state, payload) => {
      state.userInfo = Object.assign({}, state.userInfo, payload)
    },
    logout: state => {
      state.userInfo = Object.assign({})
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
            commit('setUserInfo', {
              account: userDoc.id,
              photoSrc: userDoc.data().photoSrc,
            })
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

const moduleAuthor = {
  state: {
    isAuthorExists: false,
    authorInfo: {
      account: '',
      nickname: '',
      sidebarInfo: [],
      bannerSrc: '',
      photoSrc: '',
      introduce: '',
    },
  },
  mutations: {
    fetchAuthorInfo: (state, payload) => {
      state.isAuthorExists = true
      state.authorInfo.account = payload.account
      state.authorInfo.nickname = payload.nickname
      state.authorInfo.sidebarInfo = payload.sidebarInfo
      state.authorInfo.bannerSrc = payload.bannerSrc
      state.authorInfo.photoSrc = payload.photoSrc
      state.authorInfo.introduce = payload.introduce
    },
    updateAuthorProfile: (state, payload) => {
      state.authorInfo.nickname = payload.nickname
      state.authorInfo.sidebarInfo = payload.sidebarInfo
      state.authorInfo.bannerSrc = payload.bannerSrc
      state.authorInfo.photoSrc = payload.photoSrc
      state.authorInfo.introduce = payload.introduce
    },
  },
  actions: {
    fetchAuthorInfo: async ({ commit }, { account }) => {
      const authorRef = db.collection('Users').doc(account)
      const authorDoc = await authorRef.get()
      if (authorDoc.exists) {
        const authorData = authorDoc.data()
        commit('fetchAuthorInfo', {
          account,
          ...authorData,
        })
      }

      return new Promise((resolve) => {
        resolve()
      })
    },
    updateAuthorProfile: async ({ commit }, authorInfo) => {
      const authorAccount = authorInfo.account
      delete authorInfo['account']

      const authorRef = db.collection('Users').doc(authorAccount)
      await authorRef.update(authorInfo)

      commit('updateAuthorProfile', authorInfo)
    },
  },
  getters: {
    isAuthorExists: state => state.isAuthorExists,
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
        .where('author', '==', account)
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
    author: moduleAuthor,
    article: moduleArticle,
  },
})