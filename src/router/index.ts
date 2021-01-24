import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/book' 
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import(/* webpackChunkName: "book" */ '../views/book/Book.vue')
  },
  {
    path: '/book/:id',
    name: 'BookDetail',
    component: () => import(/* webpackChunkName: "book-detail" */ '../views/book-detail/BookDetail.vue')
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import(/* webpackChunkName: "favorite-book" */ '../views/favorite-book/FavoriteBook.vue')
  },
  {
    path: '/404',
    name: 'Error',
    component: () => import(/* webpackChunkName: "error" */ '../views/error/Error.vue')
  },
  {
    path: '/*',
    redirect: '/404' 
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeResolve(async (to, from, next) => {
  next();
})

export default router;
