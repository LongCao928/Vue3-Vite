import { createRouter, createWebHistory } from 'vue-router'

import bases from './base'
import users from './user'

const routes = [...bases, ...users]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
