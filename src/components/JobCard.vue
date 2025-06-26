<template>
  <div class="job-card" @click="$emit('select', job)">
    <div class="job-card-header">
      <q-avatar size="40px">
        <img :src="job.logo" :alt="job.titulo" />
      </q-avatar>
      <div class="job-card-info">
        <h4 class="job-card-title">{{ job.titulo }}</h4>
        <div class="job-card-rating">
          <q-icon name="star" color="amber" size="16px" />
          <span>{{ job.avaliacao }}</span>
        </div>
      </div>
      <div class="job-card-price">{{ job.valor }}</div>
    </div>
    <p class="job-card-description">{{ job.descricao }}</p>
    <div class="job-card-footer">
      <span class="job-category">{{ job.categoria }}</span>
      <span class="job-deadline">{{ job.prazo }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  job: {
    type: Object,
    required: true,
  },
})

defineEmits(['select'])
</script>

<style scoped>
.job-card {
  background: var(--jobu-bg-glass);
  border-radius: var(--jobu-radius-lg);
  padding: var(--jobu-space-lg);
  margin-bottom: var(--jobu-space-md);
  border: 1px solid var(--jobu-border-subtle);
  cursor: pointer;
  transition: all var(--jobu-transition-normal);
  backdrop-filter: blur(10px);
}

.job-card:hover {
  background: var(--jobu-bg-glass-hover);
  border-color: var(--jobu-border-glass);
  transform: translateY(-2px);
  box-shadow: var(--jobu-shadow-glow);
}

.job-card-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--jobu-space-sm);
}

.job-card-info {
  flex: 1;
  margin-left: var(--jobu-space-sm);
}

.job-card-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: var(--jobu-text-primary);
}

.job-card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--jobu-text-secondary);
}

.job-card-price {
  font-weight: 600;
  color: var(--jobu-secondary);
  font-size: 1.1rem;
}

.job-card-description {
  margin: 0 0 var(--jobu-space-sm) 0;
  color: var(--jobu-text-secondary);
  line-height: 1.4;
}

.job-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--jobu-text-muted);
}

.job-category {
  background: var(--jobu-bg-glass-hover);
  color: var(--jobu-secondary);
  padding: var(--jobu-space-xs) var(--jobu-space-sm);
  border-radius: var(--jobu-radius-sm);
}
</style>
