// stores/clientProfile.js
import { ref, reactive } from 'vue'

// Store para gerenciar dados do perfil do cliente
export const useClientProfileStore = () => {
  // Estado do perfil
  const userProfile = reactive({
    nome: 'Empresa Company',
    id: '782310273–323',
    email: 'empresa@email.com',
    telefone: '(11) 91234-5678',
    avatar:
      'https://img.freepik.com/vetores-gratis/logo-search-engine_1071-76.jpg?semt=ais_hybrid&w=740',
  })

  // Configurações do usuário
  const userSettings = reactive({
    notifications: true,
    darkMode: true,
    language: 'Português',
    paymentMethods: [],
  })

  // Freelancers e serviços
  const availableFreelancers = ref([
    {
      id: 1,
      nome: 'Joana Rodrigues',
      categoria: 'Design Gráfico',
      rating: 4.8,
      descricao:
        'Trabalho com criação de logotipos, paleta de cores, tipografia e toda a identidade visual da sua empresa ou projeto.',
      avatar: 'https://via.placeholder.com/100',
      comentarios: [
        {
          autor: 'Lucas M.',
          rating: 5,
          texto: 'Muito profissional! Entregou antes do prazo e o resultado ficou incrível.',
        },
        {
          autor: 'Camila S.',
          rating: 5,
          texto: 'Joana entendeu exatamente o que eu queria. Super recomendo!',
        },
      ],
      servicos: [
        {
          label: 'Criação de Logotipos',
          value: 'logo1',
          caption: 'R$ 85,00',
          preco: 85,
        },
        {
          label: 'Design de Identidade Visual',
          value: 'identidade',
          caption: 'R$ 150,00',
          preco: 150,
        },
        {
          label: 'Material Gráfico',
          value: 'material',
          caption: 'R$ 75,00',
          preco: 75,
        },
      ],
    },
  ])

  const selectedFreelancer = ref(null)

  // Contratos ativos
  const activeContracts = ref([])

  // Métodos
  const updateProfile = (newData) => {
    Object.assign(userProfile, newData)
  }

  const updateSettings = (newSettings) => {
    Object.assign(userSettings, newSettings)
  }

  const selectFreelancer = (freelancerId) => {
    selectedFreelancer.value = availableFreelancers.value.find((f) => f.id === freelancerId)
  }

  const addContract = (freelancerId, serviceId) => {
    const freelancer = availableFreelancers.value.find((f) => f.id === freelancerId)
    const service = freelancer?.servicos.find((s) => s.value === serviceId)

    if (freelancer && service) {
      activeContracts.value.push({
        id: Date.now(),
        freelancer: freelancer.nome,
        service: service.label,
        preco: service.preco,
        status: 'ativo',
        dataContrato: new Date().toISOString(),
      })
    }
  }

  const addPaymentMethod = (method) => {
    userSettings.paymentMethods.push(method)
  }

  return {
    // Estado
    userProfile,
    userSettings,
    availableFreelancers,
    selectedFreelancer,
    activeContracts,

    // Métodos
    updateProfile,
    updateSettings,
    selectFreelancer,
    addContract,
    addPaymentMethod,
  }
}
