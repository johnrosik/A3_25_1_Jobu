const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // ROTAS PAGES
  {
    path: '/sobre',
    component: () => import('pages/clientFreelancerProfile.vue'),
  },

  {
    path: '/servicos',
    component: () => import('pages/clientProfile.vue'),
  },

  {
    path: '/editar',
    component: () => import('pages/clientProfileEdit.vue'),
  },

  {
    path: '/logout',
    component: () => import('pages/clientProfileLogout.vue'),
  },

  {
    path: '/servicos',
    component: () => import('pages/clientServicoSelect.vue'),
  },

  {
    path: '/categorias',
    component: () => import('pages/freelancerCategorias.vue'),
  },

  {
    path: '/jobs',
    component: () => import('pages/freelancerJobs.vue'),
  },
  {
    path: '/detalhe',
    component: () => import('pages/freelancerJobsDetails.vue'),
  },

  {
    path: '/interesses',
    component: () => import('pages/freelancerJobsInterest.vue'),
  },

  {
    path: '/freelancer',
    component: () => import('pages/freelancerProfile.vue'),
  },

  {
    path: '/editar',
    component: () => import('pages/freelancerProfileEdit.vue'),
  },

  {
    path: '/logout',
    component: () => import('pages/freelancerProfileLogout.vue'),
  },

  {
    path: '/share',
    component: () => import('pages/freelancerProfileShare.vue'),
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
