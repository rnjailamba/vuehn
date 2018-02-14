import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Industriesupload from '@/components/Industriesupload'
import Industriesview from '@/components/Industriesview'
import Industry from '@/components/Industry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/industriesupload',
      name: 'Industriesupload',
      component: Industriesupload
    },
    {
      path: '/industriesview',
      name: 'Industriesview',
      component: Industriesview
    },
    {
      path: '/industry/:id',
      name: 'Industry',
      component: Industry
    }        
  ]
})
