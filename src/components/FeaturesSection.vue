<script setup>
import { features } from '../data/content.js'
</script>

<template>
  <section class="features">
    <div class="container">
      <div
        v-for="(feature, index) in features"
        :key="feature.num"
        class="feature-row"
        :class="{ reverse: index % 2 === 1 }"
      >
        <div class="feature-visual" :style="{ '--accent': feature.accent }">
          <div class="feature-mock">
            <span class="mock-num">{{ feature.num.split('·')[0].trim() }}</span>
            <div class="mock-screen">
              <div class="mock-line" />
              <div class="mock-line short" />
              <div class="mock-card" />
            </div>
          </div>
        </div>
        <div class="feature-content">
          <p class="section-label">{{ feature.num }}</p>
          <h2 class="section-title">
            {{ feature.title[0] }}<br />
            <span class="emphasis">{{ feature.title[1] }}</span>
          </h2>
          <p class="section-desc">{{ feature.desc }}</p>
          <a href="#download" class="feature-link">{{ feature.cta }} →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 60px 0 100px;
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  padding: 48px 0;
}

.feature-row.reverse {
  direction: rtl;
}

.feature-row.reverse > * {
  direction: ltr;
}

.feature-visual {
  display: flex;
  justify-content: center;
}

.feature-mock {
  width: 280px;
  padding: 24px;
  background: var(--bg-card);
  border-radius: 24px;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
}

.mock-num {
  font-size: 0.7rem;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.mock-screen {
  margin-top: 20px;
  padding: 20px;
  background: var(--bg-deep);
  border-radius: 16px;
}

.mock-line {
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  margin-bottom: 10px;
}

.mock-line.short {
  width: 60%;
}

.mock-card {
  margin-top: 24px;
  height: 120px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent) 0%, transparent 80%);
  opacity: 0.4;
}

.feature-content .section-desc {
  margin-bottom: 24px;
}

.feature-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--accent-gold);
  transition: gap 0.2s;
}

.feature-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .feature-row,
  .feature-row.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: 32px;
  }

  .feature-row.reverse > * {
    direction: ltr;
  }
}
</style>
