import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/login',
      name : 'login.index',
      component : () => import('../views/index.vue'),
      meta : {
        auth : false
      }
    },
    {
      path : '/',
      name : 'dashboard.index',
      component : () => import('../views/dashboard/index.vue'),
      meta : {
        auth : true
      }
    },
    {
      path : '/consultation',
      name : 'consultation.create',
      component : () => import('../views/consultation/create.vue'),
      meta : {
        auth : true
      }
    },
    {
      path : '/vaccination-spot',
      name : 'vaccination-spot.index',
      component : () => import('../views/vaccination-spot/index.vue'),
      meta : {
        auth : true
      }
    },
    {
      path : '/vaccination-spot/:id',
      name : 'vaccination-spot.show',
      component : () => import('../views/vaccination-spot/show.vue'),
      meta : {
        auth : true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if(to.meta.auth && !token){
    next('/login')
    console.info('Need Login')
  }
  if(!to.meta.auth && token){
    next(from)
    console.info('Access denied, You is Logged in')
  }
  else{
    next();
  }
})

export default router
