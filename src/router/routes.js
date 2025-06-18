const routes = [
  {
    path: '/',
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
    path: '/jobs',
    component: () => import('pages/FreelancerJobsPage.vue'),
  },
  {
    path: '/detalhe',
    component: () => import('pages/FreelancerJobsDetailsPage.vue'),
  },

  {
    path: '/interesses',
    component: () => import('pages/FreelancerJobsInterestPage.vue'),
  },

  {
    path: '/freelancer',
    component: () => import('pages/FreelancerProfilePage.vue'),
  },

  {
    path: '/editar',
    component: () => import('pages/FreelancerProfileEditPage.vue'),
  },

  {
    path: '/logout',
    component: () => import('pages/FreelancerProfileLogoutPage.vue'),
  },

  {
    path: '/share',
    component: () => import('pages/FreelancerProfileSharePage.vue'),
  },

  // PAGES/FREELANCER

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
