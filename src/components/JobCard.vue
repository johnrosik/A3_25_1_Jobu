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
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid rgba(0, 184, 148, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.job-card:hover {
  background: rgba(0, 184, 148, 0.1);
  border-color: rgba(0, 184, 148, 0.3);
  transform: translateY(-2px);
}

.job-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.job-card-info {
  flex: 1;
  margin-left: 12px;
}

.job-card-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: white;
}

.job-card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.7);
}

.job-card-price {
  font-weight: 600;
  color: #00b894;
  font-size: 1.1rem;
}

.job-card-description {
  margin: 0 0 12px 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.job-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.job-category {
  background: rgba(0, 184, 148, 0.2);
  color: #00b894;
  padding: 4px 8px;
  border-radius: 8px;
}
</style>
