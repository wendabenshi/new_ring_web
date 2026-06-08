<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { navLinks } from '../data/content.js'

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="header" :class="{ scrolled, 'menu-open': menuOpen }">
    <div class="container header-inner">
      <a href="#" class="logo">
        <span class="logo-icon" aria-hidden="true">✦</span>
        <span class="logo-text">WooMoo</span>
      </a>

      <nav class="nav-desktop">
        <a v-for="link in navLinks" :key="link.href" :href="link.href">
          {{ link.label }}
        </a>
      </nav>

      <div class="header-actions">
        <a href="#download" class="btn btn-primary btn-sm">Download</a>
        <button
          class="menu-toggle"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    <nav class="nav-mobile" :class="{ open: menuOpen }">
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </a>
      <a href="#download" class="btn btn-primary" @click="menuOpen = false">
        Download
      </a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  transition: background 0.3s, backdrop-filter 0.3s, border-color 0.3s;
}

.header.scrolled {
  background: rgba(10, 8, 18, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 600;
}

.logo-icon {
  color: var(--accent-gold);
  font-size: 1.1rem;
}

.nav-desktop {
  display: flex;
  gap: 32px;
}

.nav-desktop a {
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.nav-desktop a:hover {
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-sm {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: transform 0.2s, opacity 0.2s;
}

.menu-open .menu-toggle span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-open .menu-toggle span:nth-child(2) {
  opacity: 0;
}

.menu-open .menu-toggle span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav-mobile {
  display: none;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border-subtle);
}

.nav-mobile.open {
  display: flex;
}

.nav-mobile a {
  font-size: 1.1rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }

  .header-actions .btn-primary {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
