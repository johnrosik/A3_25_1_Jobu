const routes = [
  // Redirecionamento da raiz
  {
    path: '/',
    redirect: '/index',
  },

  // Páginas principais
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/intro',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IntroductionPage.vue') }],
  },
  {
    path: '/descubra',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DiscoverPage.vue') }],
  },

  // Perfis principais
  {
    path: '/freelancer-hub',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FreelancerProfile.vue') }],
  },
  {
    path: '/client-profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ClientProfile.vue') }],
  },

  // Páginas individuais (para compatibilidade)
  {
    path: '/freelancer-profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FreelancerProfile.vue') }],
  },
  {
    path: '/client-basic',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ClientProfile.vue') }],
  },

  // Páginas de serviços e funcionalidades
  {
    path: '/servicos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ClientServicoSelectPage.vue') }],
  },
  {
    path: '/filtros',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FilterPage.vue') }],
  },
  {
    path: '/interesses',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/InterestPage.vue') }],
  },
  {
    path: '/pagamento',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PaymentPage.vue') }],
  },
  {
    path: '/adicionar-cartao',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AddCardPage.Vue') }],
  },

  // Página de erro 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
