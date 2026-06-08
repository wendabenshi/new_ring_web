<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { influencers } from '../data/content.js'

const scrollRef = ref(null)
let animationId = null

function autoScroll() {
  const el = scrollRef.value
  if (!el) return
  el.scrollLeft += 1
  if (el.scrollLeft >= el.scrollWidth / 2) {
    el.scrollLeft = 0
  }
  animationId = requestAnimationFrame(autoScroll)
}

onMounted(() => {
  animationId = requestAnimationFrame(autoScroll)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})

const doubled = [...influencers, ...influencers]
</script>

<template>
  <section class="influencers">
    <div class="container">
      <header class="influencers-header">
        <h2 class="section-title">
          Influencers choose<br />
          <span class="emphasis">WooMoo</span>
        </h2>
        <p class="section-desc">
          Over 20 creators across TikTok and Instagram have shared their unfiltered WooMoo reading.
        </p>
      </header>
    </div>

    <div ref="scrollRef" class="influencers-track">
      <div class="influencers-inner">
        <article
          v-for="(item, i) in doubled"
          :key="`${item.handle}-${i}`"
          class="influencer-card"
        >
          <div class="influencer-thumb">
            <span class="play-icon">▶</span>
          </div>
          <div class="influencer-meta">
            <span class="platform">{{ item.platform }}</span>
            <span class="handle">{{ item.handle }}</span>
            <span class="watch">Watch full</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.influencers {
  padding: 80px 0;
  overflow: hidden;
}

.influencers-header {
  text-align: center;
  margin-bottom: 48px;
}

.influencers-header .section-desc {
  margin: 0 auto;
}

.influencers-track {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
}

.influencers-track::-webkit-scrollbar {
  display: none;
}

.influencers-inner {
  display: flex;
  gap: 16px;
  padding: 0 24px 8px;
  width: max-content;
}

.influencer-card {
  flex-shrink: 0;
  width: 200px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  transition: transform 0.2s;
}

.influencer-card:hover {
  transform: scale(1.03);
}

.influencer-thumb {
  aspect-ratio: 9/16;
  background: linear-gradient(180deg, #2a2240 0%, #14101f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.play-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  padding-left: 4px;
}

.influencer-meta {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.platform {
  font-size: 0.7rem;
  color: var(--accent-gold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.handle {
  font-size: 0.9rem;
  font-weight: 500;
}

.watch {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
}
</style>
