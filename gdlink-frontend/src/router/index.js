// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ResourceForm from '../views/ResourceSharingForm.vue'
import FavouritePage from '../views/FavouritePage.vue'
import MyShareLinksPage from '../views/MyShareLinksPage.vue'
import ShareWithMePage from '../views/SharedWithMePage.vue'
import NotificationPage from '../views/NotificationPage.vue'
import GroupPage from '../views/GroupPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import ResourceDetailsPage from '../views/ResourceDetailsPage.vue'
import AllResourcesPage from '../views/AllResourcesPage.vue'
import UserLogPage from '../views/UserLogPage.vue'
import CategoryPage from '../views/CategoryPage.vue'
import CategoryForm from '../views/CategoryForm.vue'

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
  { path: '/my_sharelinks/resource/:resourceId', name:'My ShareLinks Resource Details', component: ResourceDetailsPage, meta: { view: 'share' }},
  { path: '/shared_with_me/resource/:resourceId', name:'Shared With Me Resource Details', component: ResourceDetailsPage, meta: { view: 'receive' }},
  { path: '/favourites/resource/:resourceId', name:'Favourites Resource Details', component: ResourceDetailsPage, meta: { view: 'receive', type: 'favourites' }},
  { path: '/admin/AllResources', name: 'All Resources Page', component: AllResourcesPage },
  { path: '/admin/UserLog', name: 'User Log Page', component: UserLogPage},
  { path: '/admin/category', name:'CategoryPage', component: CategoryPage},
  { path: '/admin/category_form', name:'Category Create Form', component: CategoryForm},
  { path: '/admin/category_form/:categoryId', name:'Category Edit Form', component: CategoryForm},
  { path: '/admin/resource_management/resource/:resourceId', name:'Resource Management Resource Details', component: ResourceDetailsPage, meta: { view: 'share' }},
  { path: '/admin/resource_management/resource/edit/:resourceId', name:'Resource Management Edit Resource Form', component: ResourceForm, meta: { view: 'edit'}},
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const sessionData = sessionStorage.getItem('utmwebfc_session'); 

  if (!sessionData && to.path !== '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router
