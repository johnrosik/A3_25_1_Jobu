const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // ROTAS PAGES
  {
    path: '/sobre',
    component: () => import('pages/ClientFreelancerProfilePage.vue'),
  },

  {
    path: '/servicos',
    component: () => import('pages/ClientProfilePage.vue'),
  },

  {
    path: '/editar',
    component: () => import('pages/ClientProfileEditPage.vue'),
  },

  {
    path: '/logout',
    component: () => import('pages/ClientProfileLogoutPage.vue'),
  },

  {
    path: '/servicos',
    component: () => import('pages/ClientServicoSelectPage.vue'),
  },

  {
    path: '/categorias',
    component: () => import('pages/FreelancerCategoriesPage.vue'),
  },

  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/descubra',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DiscoverPage.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
