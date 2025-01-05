// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ResourceForm from '../views/UploadForm.vue'
import FavouritePage from '../views/FavouritePage.vue'
import MyShareLinksPage from '../views/MyShareLinksPage.vue'
import ShareWithMePage from '../views/SharedWithMePage.vue'
import NotificationPage from '../views/NotificationPage.vue'
import GroupPage from '../views/GroupPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import ResourceDetailsPage from '../views/ResourceDetailsPage.vue'


const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/resource/share', name:'Share Resource Form', component: ResourceForm, meta: { view: 'share'}},
  { path: '/resource/edit/:resourceId', name:'Edit Resource Form', component: ResourceForm, meta: { view: 'edit'}},
  { path: '/favourites', name:'Favourites', component: FavouritePage},
  { path: '/my_sharelinks', name:'My ShareLinks', component: MyShareLinksPage},
  { path: '/shared_with_me', name:'Share with me', component: ShareWithMePage},
  { path: '/notification', name:'Notification', component: NotificationPage},
  { path: '/groups', name:'Group', component: GroupPage},
  { path: '/profile', name:'Profile', component: ProfilePage},
  { path: '/my_sharelinks/resources/:resourceId', name:'My ShareLinks Resource Details', component: ResourceDetailsPage, meta: { view: 'share' }},
  { path: '/shared_with_me/resources/:resourceId', name:'Shared With Me Resource Details', component: ResourceDetailsPage, meta: { view: 'receive' }},
  { path: '/favourites/resources/:resourceId', name:'Favourites Resource Details', component: ResourceDetailsPage, meta: { view: 'receive' }}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
