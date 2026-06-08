<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { reviews } from '../data/content.js'

const currentIndex = ref(0)
const visibleCount = ref(3)

function updateVisibleCount() {
  if (window.innerWidth < 640) visibleCount.value = 1
  else if (window.innerWidth < 1024) visibleCount.value = 2
  else visibleCount.value = 3
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCount)
})

const maxIndex = computed(() =>
  Math.max(0, reviews.length - visibleCount.value)
)

function prev() {
  currentIndex.value = Math.max(0, currentIndex.value - 1)
}

function next() {
  currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1)
}

const visibleReviews = computed(() => {
  const start = currentIndex.value
  return reviews.slice(start, start + visibleCount.value)
})
</script>

<template>
  <section class="reviews">
    <div class="container">
      <header class="reviews-header">
        <h2 class="section-title">Whispers from the Seekers</h2>
        <p class="section-desc">
          Real stories from those who found their light with WooMoo
        </p>
      </header>

      <div class="reviews-carousel">
        <button
          class="carousel-btn"
          aria-label="Previous reviews"
          :disabled="currentIndex === 0"
          @click="prev"
        >
          ‹
        </button>

        <div class="reviews-track" :style="{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }">
          <article
            v-for="review in visibleReviews"
            :key="review.author"
            class="review-card"
          >
            <div class="stars">★★★★★</div>
            <h3 class="review-title">{{ review.title }}</h3>
            <blockquote class="review-text">"{{ review.text }}"</blockquote>
            <footer class="review-author">— {{ review.author }} · App Store</footer>
          </article>
        </div>

        <button
          class="carousel-btn"
          aria-label="Next reviews"
          :disabled="currentIndex >= maxIndex"
          @click="next"
        >
          ›
        </button>
      </div>

      <div class="reviews-dots">
        <button
          v-for="(_, i) in maxIndex + 1"
          :key="i"
          class="dot"
          :class="{ active: i === currentIndex }"
          :aria-label="`Go to slide ${i + 1}`"
          @click="currentIndex = i"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  padding: 80px 0 120px;
}

.reviews-header {
  text-align: center;
  margin-bottom: 48px;
}

.reviews-header .section-desc {
  margin: 0 auto;
}

.reviews-carousel {
  display: flex;
  align-items: stretch;
  gap: 16px;
}

.carousel-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  align-self: center;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: 1.5rem;
  line-height: 1;
  transition: background 0.2s, border-color 0.2s;
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(201, 168, 108, 0.1);
  border-color: var(--accent-gold);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.reviews-track {
  flex: 1;
  display: grid;
  gap: 16px;
  min-height: 280px;
}

.review-card {
  padding: 28px;
  background: var(--bg-card);
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
}

.stars {
  color: var(--accent-gold);
  font-size: 0.85rem;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.review-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.review-text {
  flex: 1;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.65;
  font-style: normal;
  margin-bottom: 16px;
}

.review-author {
  font-size: 0.8rem;
  color: var(--text-muted);
  opacity: 0.8;
}

.reviews-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}

.dot.active {
  background: var(--accent-gold);
  transform: scale(1.2);
}

@media (max-width: 640px) {
  .carousel-btn {
    display: none;
  }
}
</style>
