// stores/freelancerProfile.js
import { ref, reactive } from 'vue'

// Store para gerenciar dados do perfil do freelancer
export const useFreelancerProfileStore = () => {
  // Estado do perfil
  const freelancerProfile = reactive({
    nome: 'Joana da Silva',
    categoria: 'Design Gráfico',
    email: 'joana@email.com',
    telefone: '(11) 91234-5678',
    rating: 4.8,
    avaliacoes: 127,
    projetos: 84,
    clientes: 52,
    ganhos: '12.5k',
    avatar: 'https://via.placeholder.com/120',
    descricao: 'Designer gráfica especializada em identidade visual e branding.',
    portfolio: [
      {
        id: 1,
        imagem: 'https://via.placeholder.com/200x150',
        titulo: 'Logo Moderna',
        categoria: 'Branding',
        cliente: 'Empresa ABC',
        ano: 2024,
      },
      {
        id: 2,
        imagem: 'https://via.placeholder.com/200x150',
        titulo: 'Website Design',
        categoria: 'Web Design',
        cliente: 'Startup XYZ',
        ano: 2024,
      },
      {
        id: 3,
        imagem: 'https://via.placeholder.com/200x150',
        titulo: 'Cartão Visita',
        categoria: 'Print Design',
        cliente: 'Consultoria 123',
        ano: 2023,
      },
    ],
    habilidades: ['Photoshop', 'Illustrator', 'Figma', 'Branding', 'UI/UX', 'Typography'],
    disponibilidade: 'Disponível',
    valorHora: 45,
    localizacao: 'São Paulo, SP',
  })

  // Configurações do freelancer
  const freelancerSettings = reactive({
    disponivel: true,
    notificacoes: true,
    perfilPublico: true,
    receberOfertas: true,
    mostrarValorHora: true,
  })

  // Categorias de trabalho
  const categorias = ref([
    {
      id: 1,
      nome: 'Design Gráfico',
      icon: 'design_services',
      vagas: 45,
      descricao: 'Criação visual, logotipos, identidade visual',
      subcategorias: ['Logo Design', 'Branding', 'Print Design', 'Ilustração'],
    },
    {
      id: 2,
      nome: 'Desenvolvimento',
      icon: 'code',
      vagas: 32,
      descricao: 'Websites, aplicativos, sistemas',
      subcategorias: ['Frontend', 'Backend', 'Mobile', 'Full Stack'],
    },
    {
      id: 3,
      nome: 'Escrita e Tradução',
      icon: 'edit',
      vagas: 28,
      descricao: 'Conteúdo, copywriting, tradução',
      subcategorias: ['Blog Posts', 'Copywriting', 'Tradução', 'Revisão'],
    },
    {
      id: 4,
      nome: 'Marketing Digital',
      icon: 'campaign',
      vagas: 21,
      descricao: 'SEO, redes sociais, campanhas',
      subcategorias: ['SEO', 'Social Media', 'Google Ads', 'Email Marketing'],
    },
    {
      id: 5,
      nome: 'Vídeo e Animação',
      icon: 'videocam',
      vagas: 18,
      descricao: 'Edição, motion graphics, animações',
      subcategorias: ['Edição', 'Motion Graphics', '3D', 'Animação'],
    },
    {
      id: 6,
      nome: 'Música e Áudio',
      icon: 'music_note',
      vagas: 12,
      descricao: 'Produção musical, locução, podcast',
      subcategorias: ['Produção Musical', 'Locução', 'Podcast', 'Sound Design'],
    },
    {
      id: 7,
      nome: 'Consultoria',
      icon: 'business',
      vagas: 15,
      descricao: 'Estratégia, negócios, mentoria',
      subcategorias: ['Estratégia', 'Negócios', 'Mentoria', 'Análise'],
    },
    {
      id: 8,
      nome: 'Educação',
      icon: 'school',
      vagas: 9,
      descricao: 'Cursos, tutoriais, treinamentos',
      subcategorias: ['Cursos Online', 'Tutoriais', 'Treinamentos', 'Coaching'],
    },
  ])

  // Vagas disponíveis
  const vagas = ref([
    {
      id: 1,
      logo: 'https://via.placeholder.com/60',
      titulo: 'Criação de Identidade Visual Completa',
      empresa: 'Cosméticos Naturais Ltda',
      avaliacao: '4.2',
      descricao: 'Desenvolvimento completo de marca para empresa de cosméticos naturais.',
      descricaoCompleta:
        'Estamos procurando um(a) designer gráfico(a) talentoso(a) e comprometido(a) para desenvolver a identidade visual de uma nova marca de cosméticos naturais. O projeto busca transmitir uma estética leve, moderna e sofisticada, alinhada com os valores de sustentabilidade e bem-estar da marca.',
      categoria: 'Design Gráfico',
      subcategoria: 'Branding',
      valor: 'R$ 650,00',
      valorNumerico: 650,
      prazo: '7 dias',
      local: 'Remoto',
      urgente: false,
      dataPublicacao: '2024-06-15',
      candidatos: 12,
      requisitos: [
        'Criação de logotipo principal e variações',
        'Definição de paleta de cores',
        'Escolha de tipografias e combinações',
        'Criação de elementos gráficos complementares',
        'Entrega do material em PDF e imagens',
      ],
      habilidadesRequeridas: ['Illustrator', 'Photoshop', 'Branding'],
      nivel: 'Intermediário',
    },
    {
      id: 2,
      logo: 'https://via.placeholder.com/60',
      titulo: 'Redatora para Blog de Lifestyle',
      empresa: 'Blog Bem-Estar',
      avaliacao: '4.5',
      descricao: 'Criação de conteúdo para blog de lifestyle e bem-estar.',
      descricaoCompleta:
        'Buscamos redatora criativa para produzir conteúdo de qualidade para blog focado em lifestyle, bem-estar e desenvolvimento pessoal. O conteúdo deve ser envolvente, informativo e otimizado para SEO.',
      categoria: 'Escrita e Tradução',
      subcategoria: 'Blog Posts',
      valor: 'R$ 300,00',
      valorNumerico: 300,
      prazo: '5 dias',
      local: 'Remoto',
      urgente: true,
      dataPublicacao: '2024-06-16',
      candidatos: 8,
      requisitos: [
        '3 artigos de 800-1000 palavras',
        'Pesquisa de palavras-chave',
        'Otimização para SEO',
        'Revisão e edição',
      ],
      habilidadesRequeridas: ['SEO', 'Copywriting', 'Pesquisa'],
      nivel: 'Básico',
    },
    {
      id: 3,
      logo: 'https://via.placeholder.com/60',
      titulo: 'Desenvolvimento de Landing Page',
      empresa: 'Startup Inovadora',
      avaliacao: '4.7',
      descricao: 'Criação de landing page responsiva para campanha de marketing.',
      descricaoCompleta:
        'Desenvolvimento de landing page moderna e responsiva para campanha de lançamento de produto. A página deve ter design atrativo, ser otimizada para conversão e incluir formulários de captura.',
      categoria: 'Desenvolvimento',
      subcategoria: 'Frontend',
      valor: 'R$ 800,00',
      valorNumerico: 800,
      prazo: '10 dias',
      local: 'Remoto',
      urgente: false,
      dataPublicacao: '2024-06-14',
      candidatos: 15,
      requisitos: [
        'Design responsivo',
        'Integração com formulários',
        'Otimização de performance',
        'Testes em diferentes dispositivos',
      ],
      habilidadesRequeridas: ['HTML', 'CSS', 'JavaScript', 'React'],
      nivel: 'Avançado',
    },
    {
      id: 4,
      logo: 'https://via.placeholder.com/60',
      titulo: 'Edição de Vídeos para YouTube',
      empresa: 'Canal Educativo',
      avaliacao: '4.3',
      descricao: 'Edição profissional de vídeos educativos para canal do YouTube.',
      descricaoCompleta:
        'Procuramos editor experiente para produzir vídeos educativos de alta qualidade. O trabalho inclui cortes, transições, inserção de gráficos e otimização para a plataforma YouTube.',
      categoria: 'Vídeo e Animação',
      subcategoria: 'Edição',
      valor: 'R$ 450,00',
      valorNumerico: 450,
      prazo: '14 dias',
      local: 'Remoto',
      urgente: false,
      dataPublicacao: '2024-06-13',
      candidatos: 6,
      requisitos: [
        'Edição de 4 vídeos de 10-15 minutos',
        'Inserção de gráficos e animações simples',
        'Correção de cor e áudio',
        'Criação de thumbnails',
      ],
      habilidadesRequeridas: ['Premiere Pro', 'After Effects', 'Photoshop'],
      nivel: 'Intermediário',
    },
  ])

  // Candidaturas do freelancer
  const candidaturas = ref([])

  // Projetos em andamento
  const projetosAtivos = ref([])

  // Histórico de projetos
  const historicoProjeios = ref([])

  // Métodos
  const updateProfile = (newData) => {
    Object.assign(freelancerProfile, newData)
  }

  const updateSettings = (newSettings) => {
    Object.assign(freelancerSettings, newSettings)
  }

  const addPortfolioItem = (item) => {
    freelancerProfile.portfolio.push({
      id: Date.now(),
      ...item,
    })
  }

  const removePortfolioItem = (itemId) => {
    const index = freelancerProfile.portfolio.findIndex((item) => item.id === itemId)
    if (index > -1) {
      freelancerProfile.portfolio.splice(index, 1)
    }
  }

  const addSkill = (skill) => {
    if (!freelancerProfile.habilidades.includes(skill)) {
      freelancerProfile.habilidades.push(skill)
    }
  }

  const removeSkill = (skill) => {
    const index = freelancerProfile.habilidades.indexOf(skill)
    if (index > -1) {
      freelancerProfile.habilidades.splice(index, 1)
    }
  }

  const applyToJob = (vagaId) => {
    const vaga = vagas.value.find((v) => v.id === vagaId)
    if (vaga && !candidaturas.value.find((c) => c.vagaId === vagaId)) {
      candidaturas.value.push({
        id: Date.now(),
        vagaId: vagaId,
        vaga: vaga,
        dataAplicacao: new Date().toISOString(),
        status: 'Enviada',
        proposta: '',
        valorProposto: vaga.valorNumerico,
      })
    }
  }

  const getJobsByCategory = (categoria) => {
    if (!categoria) return vagas.value
    return vagas.value.filter((vaga) => vaga.categoria === categoria)
  }

  const getRecommendedJobs = () => {
    // Baseado na categoria principal do freelancer
    return vagas.value
      .filter(
        (vaga) =>
          vaga.categoria === freelancerProfile.categoria ||
          vaga.habilidadesRequeridas.some((skill) => freelancerProfile.habilidades.includes(skill)),
      )
      .slice(0, 5)
  }

  const calculateEarnings = () => {
    // Calcular ganhos baseado no histórico
    return {
      totalGanho: parseFloat(freelancerProfile.ganhos.replace('k', '')) * 1000,
      ganhoMensal: 2800,
      ganhoMedio: 385,
      projetosCompletos: freelancerProfile.projetos,
    }
  }

  return {
    // Estado
    freelancerProfile,
    freelancerSettings,
    categorias,
    vagas,
    candidaturas,
    projetosAtivos,
    historicoProjeios,

    // Métodos
    updateProfile,
    updateSettings,
    addPortfolioItem,
    removePortfolioItem,
    addSkill,
    removeSkill,
    applyToJob,
    getJobsByCategory,
    getRecommendedJobs,
    calculateEarnings,
  }
}
