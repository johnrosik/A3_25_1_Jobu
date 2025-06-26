import { z } from 'zod'
import { ref, computed, readonly } from 'vue'

// Schema de validação para perfil do freelancer
export const freelancerProfileSchema = z.object({
  nome: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),

  email: z.string().email('Email inválido').max(255, 'Email muito longo'),

  categoria: z.string().min(1, 'Categoria é obrigatória'),

  descricao: z.string().max(500, 'Descrição deve ter no máximo 500 caracteres').optional(),

  telefone: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato de telefone inválido')
    .optional(),

  valorHora: z
    .number()
    .min(10, 'Valor mínimo é R$ 10,00')
    .max(1000, 'Valor máximo é R$ 1000,00')
    .optional(),

  habilidades: z
    .array(z.string())
    .min(1, 'Pelo menos uma habilidade é obrigatória')
    .max(10, 'Máximo de 10 habilidades'),

  disponivel: z.boolean(),

  portfolio: z
    .array(
      z.object({
        titulo: z.string().min(1, 'Título é obrigatório'),
        descricao: z.string().optional(),
        imagem: z.string().url('URL da imagem inválida'),
        categoria: z.string().min(1, 'Categoria é obrigatória'),
      }),
    )
    .max(20, 'Máximo de 20 itens no portfolio')
    .optional(),
})

// Schema para configurações
export const settingsSchema = z.object({
  notificacoes: z.boolean(),
  disponivel: z.boolean(),
  receberEmails: z.boolean(),
  mostrarTelefone: z.boolean(),
  mostrarEmail: z.boolean(),
})

// Função de validação
export function validateFreelancerProfile(data) {
  try {
    return {
      success: true,
      data: freelancerProfileSchema.parse(data),
      errors: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    }
  }
}

// Função para sanitizar entrada do usuário
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove caracteres potencialmente perigosos
    .substring(0, 1000) // Limita tamanho
}

// Validação específica para upload de imagens
export function validateImageFile(file) {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

  if (!file) {
    return { valid: false, error: 'Arquivo é obrigatório' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Arquivo deve ter no máximo 5MB' }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Formato não suportado. Use JPEG, PNG ou WebP' }
  }

  return { valid: true, error: null }
}

// Composable para usar validação
export function useValidation() {
  const errors = ref({})

  const validateField = (fieldName, value, schema) => {
    try {
      schema.parse({ [fieldName]: value })
      errors.value[fieldName] = null
      return true
    } catch (error) {
      errors.value[fieldName] = error.errors[0]?.message || 'Valor inválido'
      return false
    }
  }

  const clearErrors = () => {
    errors.value = {}
  }

  const hasErrors = computed(() => {
    return Object.values(errors.value).some((error) => error !== null)
  })

  return {
    errors: readonly(errors),
    validateField,
    clearErrors,
    hasErrors,
  }
}
