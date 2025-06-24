import { ref, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export function useFreelancerJobs() {
  // Estado reativo
  const vagas = ref([])
  const filtroCategoria = ref('')
  const selectedJob = ref(null)
  const isLoading = ref(false)
  const hasError = ref(false)

  // Categorias disponíveis
  const categorias = ref([
    { nome: 'Design Gráfico', icon: 'design_services', vagas: 45 },
    { nome: 'Desenvolvimento', icon: 'code', vagas: 32 },
    { nome: 'Escrita e Tradução', icon: 'edit', vagas: 28 },
    { nome: 'Marketing Digital', icon: 'campaign', vagas: 21 },
    { nome: 'Vídeo e Animação', icon: 'videocam', vagas: 18 },
    { nome: 'Música e Áudio', icon: 'music_note', vagas: 12 },
    { nome: 'Consultoria', icon: 'business', vagas: 15 },
    { nome: 'Educação', icon: 'school', vagas: 9 },
  ])

  // Computed properties memoizadas
  const categoriaOptions = computed(() =>
    categorias.value.map((cat) => ({ label: cat.nome, value: cat.nome })),
  )

  const vagasFiltradas = computed(() => {
    if (!filtroCategoria.value) return vagas.value
    return vagas.value.filter((vaga) => vaga.categoria === filtroCategoria.value)
  })

  // Métodos com debounce
  const debouncedFilter = useDebounceFn((value) => {
    filtroCategoria.value = value
  }, 300)

  const selectCategory = (categoria) => {
    filtroCategoria.value = categoria.nome
  }

  const selectJob = (job) => {
    selectedJob.value = job
  }

  const clearSelection = () => {
    selectedJob.value = null
  }

  // Carregamento de dados
  const loadJobs = async () => {
    isLoading.value = true
    hasError.value = false

    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      vagas.value = [
        {
          id: 1,
          logo: 'https://via.placeholder.com/60',
          titulo: 'Criação de Identidade Visual',
          avaliacao: '4.2',
          descricao: 'Desenvolvimento completo de marca para empresa de cosméticos naturais.',
          categoria: 'Design Gráfico',
          valor: 'R$ 650,00',
          prazo: '7 dias',
        },
        {
          id: 2,
          logo: 'https://via.placeholder.com/60',
          titulo: 'Redatora para Blog',
          avaliacao: '4.5',
          descricao: 'Criação de conteúdo para blog de lifestyle e bem-estar.',
          categoria: 'Escrita e Tradução',
          valor: 'R$ 300,00',
          prazo: '5 dias',
        },
        {
          id: 3,
          logo: 'https://via.placeholder.com/60',
          titulo: 'Desenvolvimento Landing Page',
          avaliacao: '4.7',
          descricao: 'Criação de landing page responsiva para campanha de marketing.',
          categoria: 'Desenvolvimento',
          valor: 'R$ 800,00',
          prazo: '10 dias',
        },
      ]
    } catch (error) {
      hasError.value = true
      console.error('Erro ao carregar vagas:', error)
    } finally {
      isLoading.value = false
    }
  }

  const retryLoadJobs = () => {
    loadJobs()
  }

  return {
    // Estado
    vagas,
    filtroCategoria,
    selectedJob,
    isLoading,
    hasError,
    categorias,

    // Computed
    categoriaOptions,
    vagasFiltradas,

    // Métodos
    debouncedFilter,
    selectCategory,
    selectJob,
    clearSelection,
    loadJobs,
    retryLoadJobs,
  }
}
