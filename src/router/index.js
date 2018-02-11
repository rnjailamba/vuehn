import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Coins from '@/components/Coins'
import Industriesupload from '@/components/Industriesupload'
import Industriesview from '@/components/Industriesview'
import Industry from '@/components/Industry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/coins/:id',
      name: 'Coins',
      component: Coins
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
