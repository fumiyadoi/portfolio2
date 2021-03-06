import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3ea6e3d2 = () => interopDefault(import('../pages/bookedit.vue' /* webpackChunkName: "pages/bookedit" */))
const _5d3732aa = () => interopDefault(import('../pages/booklist.vue' /* webpackChunkName: "pages/booklist" */))
const _3e7a429f = () => interopDefault(import('../pages/sokudoku.vue' /* webpackChunkName: "pages/sokudoku" */))
const _4110d927 = () => interopDefault(import('../pages/sokudoku-top.vue' /* webpackChunkName: "pages/sokudoku-top" */))
const _70c4f650 = () => interopDefault(import('../pages/sokutore.vue' /* webpackChunkName: "pages/sokutore" */))
const _25e656e0 = () => interopDefault(import('../pages/sokutore-top.vue' /* webpackChunkName: "pages/sokutore-top" */))
const _4ae88d5e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/bookedit",
    component: _3ea6e3d2,
    name: "bookedit"
  }, {
    path: "/booklist",
    component: _5d3732aa,
    name: "booklist"
  }, {
    path: "/sokudoku",
    component: _3e7a429f,
    name: "sokudoku"
  }, {
    path: "/sokudoku-top",
    component: _4110d927,
    name: "sokudoku-top"
  }, {
    path: "/sokutore",
    component: _70c4f650,
    name: "sokutore"
  }, {
    path: "/sokutore-top",
    component: _25e656e0,
    name: "sokutore-top"
  }, {
    path: "/",
    component: _4ae88d5e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
