<script setup>
import { stats } from '../data/content.js'
</script>

<template>
  <section class="hero">
    <div class="hero-glow" aria-hidden="true" />
    <div class="container hero-inner">
      <p class="section-label">Tarot, attuned to you</p>
      <h1 class="hero-title">
        Bring the question<br />
        <span class="emphasis">We'll sit with it</span>
      </h1>
      <p class="hero-desc">
        An emotional companion in the language of tarot, grounded in psychology.
        For love, self-knowing, and the questions that don't sleep.
      </p>
      <div class="hero-actions">
        <a href="#reading" class="btn btn-primary">Try for free</a>
      </div>

      <div class="hero-stats">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

      <a href="#reading" class="hero-scroll">
        <span>Try a reading</span>
        <span class="scroll-arrow">↓</span>
      </a>
    </div>

    <div class="hero-cards" aria-hidden="true">
      <div class="floating-card card-1">
        <div class="card-face">☽</div>
      </div>
      <div class="floating-card card-2">
        <div class="card-face">✧</div>
      </div>
      <div class="floating-card card-3">
        <div class="card-face">☉</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  //min-height: 100vh;
  display: flex;
  align-items: center;
  //padding: calc(var(--header-height) + 48px) 0 80px;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 108, 184, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 640px;
}

.hero-title {
  font-family: var(--font-serif);
  //font-size: clamp(2.75rem, 7vw, 4.5rem);
  font-size:2em;
  color:#fff;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

.hero-desc {
  font-size: 1.15rem;
  //color: var(--text-muted);
  color:#fff;
  margin-bottom: 10px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 48px;
}

.hero-stats {
  display: flex;
  gap: 40px;
  padding-top: 32px;
  border-top: 1px solid var(--border-subtle);
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--accent-gold);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.hero-scroll {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.hero-scroll:hover {
  color: var(--accent-gold);
}

.scroll-arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

.hero-cards {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  height: 400px;
  pointer-events: none;
}

.floating-card {
  position: absolute;
  width: 140px;
  height: 220px;
  border-radius: 12px;
  background: linear-gradient(145deg, #2a2240 0%, #14101f 100%);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-face {
  font-size: 2.5rem;
  color: var(--accent-gold);
  opacity: 0.8;
}

.card-1 {
  right: 80px;
  top: 0;
  transform: rotate(-8deg);
  animation: float 6s ease-in-out infinite;
}

.card-2 {
  right: 0;
  top: 60px;
  transform: rotate(5deg);
  animation: float 6s ease-in-out infinite 1s;
}

.card-3 {
  right: 40px;
  top: 140px;
  transform: rotate(-3deg);
  animation: float 6s ease-in-out infinite 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(var(--r, -8deg)); }
  50% { transform: translateY(-12px) rotate(var(--r, -8deg)); }
}

.card-1 { --r: -8deg; }
.card-2 { --r: 5deg; }
.card-3 { --r: -3deg; }

@media (max-width: 1024px) {
  .hero-cards {
    opacity: 0.4;
    right: -5%;
  }
}

@media (max-width: 768px) {
  .hero-cards {
    display: none;
  }

  .hero-stats {
    gap: 24px;
  }
}
</style>
