import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import ArticleManagement from '@/views/articleManagement/ArticleManagement'
import ArticleCreate from '@/views/articleManagement/ArticleCreate'
import ArticleEdit from '@/views/articleManagement/ArticleEdit'
import Home from '@/views/general/Home'
import Login from '@/views/general/Login'
import NotFound404 from '@/views/general/NotFound404'
import Register from '@/views/general/Register'
import AuthorArticle from '@/views/author/AuthorArticle'
import AuthorArticles from '@/views/author/AuthorArticles'
import AuthorProfile from '@/views/author/AuthorProfile'
import AuthorPage from '@/views/author/AuthorPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      shouldNotLogin: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      shouldNotLogin: true,
    },
  },
  {
    path: '/author/:account',
    component: AuthorPage,
    children: [
      {
        path: '',
        name: 'AuthorPage',
        component: AuthorArticles,
      },
      {
        path: 'profile',
        name: 'AuthorProfile',
        component: AuthorProfile,
      },
      {
        path: 'articles/:page?',
        name: 'AuthorArticles',
        component: AuthorArticles,
      },
      {
        path: 'article/:id',
        name: 'AuthorArticle',
        component: AuthorArticle,
      },
    ],
  },
  {
    path: '/articles',
    component: ArticleManagement,
    children: [
      {
        path: 'create',
        name: 'ArticleCreate',
        component: ArticleCreate,
      },
      {
        path: 'edit/:id',
        name: 'ArticleEdit',
        component: ArticleEdit,
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound404',
    component: NotFound404,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  let checkSession = () => {
    return store.dispatch('checkSession', {
      sessionId: Vue.$cookies.get('session_id'),
    })
  }

  checkSession()
    .then(() => {
      if (to.meta.shouldNotLogin === true) { // e.g. login, register
        next({ name: 'Home'})
      } else {
        next()
      }
    })
    .catch(() => {
      next({ name: 'Home'})
    })
})

export default router
