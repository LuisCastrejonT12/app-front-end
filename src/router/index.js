import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/Home.vue'
import Home from '../components/ListaUsuarios.vue'
import Login from '../components/Login.vue'
import Album from '../components/Album.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
