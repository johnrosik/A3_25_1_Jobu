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
  // Perfil unificado
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProfileTypePage.vue') }],
  },
  {
    path: '/profile/:type',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UnifiedProfile.vue') }],
  },

  // Páginas de serviços e funcionalidades
  {
    path: '/filtros',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FilterPage.vue') }],
  },
  {
    path: '/pagamento',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PaymentPage.vue') }],
  },
  {
    path: '/adicionar-cartao',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AddCardPage.vue') }],
  },

  // Página de erro 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
