import Vue from 'vue'
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
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/authors/:account',
    component: AuthorPage,
    children: [
      {
        path: '',
        name: 'AuthorPage',
        component: AuthorArticles,
      },
      {
        path: 'profile',
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
})

export default router
