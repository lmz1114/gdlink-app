// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import UploadForm from '../views/UploadForm.vue'
import FavouritePage from '../views/FavouritePage.vue'
import MyUploadsPage from '../views/MyUploadsPage.vue'
import ShareWithMePage from '../views/ShareWithMePage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/resource_upload', name:'UploadForm', component: UploadForm},
  { path: '/favourites', name:'Favourites', component: FavouritePage},
  { path: '/my_uploads', name:'My Uploads', component: MyUploadsPage},
  { path: '/shared_with_me', name:'Share with me', component: ShareWithMePage}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
