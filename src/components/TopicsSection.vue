<script setup>
import { ref } from 'vue'
import { topics } from '../data/content.js'

const activeTopic = ref(null)

function drawCards(id) {
  activeTopic.value = id
  setTimeout(() => {
    activeTopic.value = null
  }, 2000)
}
</script>

<template>
  <section id="reading" class="topics">
    <div class="container">
      <header class="topics-header">
        <h2 class="section-title">
          What's <span class="emphasis">weighing</span> on you?
        </h2>
        <p class="section-desc">
          Pick a topic. We'll draw three cards and read them for you — right here, free.
        </p>
      </header>

      <div class="topics-grid">
        <article
          v-for="topic in topics"
          :key="topic.id"
          class="topic-card"
          :style="{ background: topic.gradient }"
          :class="{ drawing: activeTopic === topic.id }"
        >
          <div class="topic-card-visual">
            <div class="mini-tarot">
              <span class="card-symbol">✦</span>
              <p class="card-name">{{ topic.card }}</p>
            </div>
          </div>
          <div class="topic-card-body">
            <span class="topic-category">{{ topic.category }}</span>
            <h3 class="topic-question">{{ topic.question }}</h3>
            <button
              class="topic-cta"
              :disabled="activeTopic === topic.id"
              @click="drawCards(topic.id)"
            >
              {{ activeTopic === topic.id ? 'Drawing...' : 'Draw three cards' }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.topics {
  padding: 100px 0;
}

.topics-header {
  text-align: center;
  margin-bottom: 56px;
}

.topics-header .section-desc {
  margin: 0 auto;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.topic-card {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4);
}

.topic-card.drawing .mini-tarot {
  animation: shuffle 0.6s ease-in-out 3;
}

@keyframes shuffle {
  0%, 100% { transform: rotateY(0); }
  50% { transform: rotateY(180deg); }
}

.topic-card-visual {
  padding: 32px 24px 16px;
  display: flex;
  justify-content: center;
}

.mini-tarot {
  width: 100px;
  height: 150px;
  background: linear-gradient(160deg, #1a1228 0%, #0a0812 100%);
  border-radius: 10px;
  border: 1px solid rgba(201, 168, 108, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.3s;
}

.card-symbol {
  font-size: 1.5rem;
  color: var(--accent-gold);
}

.card-name {
  font-size: 0.65rem;
  text-align: center;
  color: var(--text-muted);
  padding: 0 8px;
}

.topic-card-body {
  padding: 20px 24px 28px;
  background: rgba(0, 0, 0, 0.25);
}

.topic-category {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-gold);
}

.topic-question {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 400;
  margin: 8px 0 20px;
  line-height: 1.3;
}

.topic-cta {
  width: 100%;
  padding: 12px 16px;
  border-radius: 999px;
  background: rgba(201, 168, 108, 0.15);
  border: 1px solid var(--accent-gold);
  color: var(--accent-gold);
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s;
}

.topic-cta:hover:not(:disabled) {
  background: rgba(201, 168, 108, 0.25);
}

.topic-cta:disabled {
  opacity: 0.7;
  cursor: wait;
}
</style>
