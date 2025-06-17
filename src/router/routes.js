const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // PAGES/CLIENT
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },

  {
    path: '/cadastro',
    component: () => import('pages/client/clientFreelancerProfile.vue'),
  },

  {
    path: '/cliente/servicos',
    component: () => import('pages/client/clientProfile.vue'),
  },

  {
    path: '/cliente/editarperfil',
    component: () => import('pages/client/clientProfileEdit.vue'),
  },

  {
    path: '/cliente/logout',
    component: () => import('pages/client/clientProfileLogout.vue'),
  },

  {
    path: '/cliente/editar',
    component: () => import('pages/client/clientServicoSelect.vue'),
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
