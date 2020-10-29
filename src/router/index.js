import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleManagement from '@/views/articleManagement/ArticleManagement'
import ArticleCreate from '@/views/articleManagement/ArticleCreate'
import ArticleEdit from '@/views/articleManagement/ArticleEdit'
import Home from '@/views/general/Home'
import Login from '@/views/general/Login'
import NotFound404 from '@/views/general/NotFound404'
import Register from '@/views/general/Register'
import UserArticle from '@/views/user/UserArticle'
import UserArticles from '@/views/user/UserArticles'
import UserProfile from '@/views/user/UserProfile'
import UserPage from '@/views/user/UserPage'


Vue.use(VueRouter)

/*
部落格首頁 /
登入       /login
註冊       /register
個人首頁   /users/:id
自我介紹   /users/:id/profile  (==自我介紹)
文章列表   /users/:id/articles (可分詳細/清單)
文章內容   /users/:id/articles/:artId
新增文章   /users/:id/articles/add
修改文章   /users/:id/articles/edit/:artId
*/

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
    path: '/users/:account',
    component: UserPage,
    children: [
      {
        path: '',
        name: 'UserPage',
        component: UserArticles,
      },
      {
        path: 'profile',
        component: UserProfile,
      },
      {
        path: 'articles/:page?',
        name: 'UserArticles',
        component: UserArticles,
      },
      {
        path: 'article/:id',
        name: 'UserArticle',
        component: UserArticle,
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
