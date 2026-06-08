<script setup>
import { footerExplore, footerLove } from '../data/content.js'
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <a href="#" class="logo">
          <span class="logo-icon">✦</span>
          <span class="logo-text">WooMoo</span>
        </a>
        <p class="footer-tagline">
          Personalized tarot readings attuned to your unique journey.
        </p>
      </div>

      <div class="footer-links">
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li v-for="item in footerExplore" :key="item">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Love Readings</h4>
          <ul>
            <li v-for="item in footerLove" :key="item">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>© 2026 WooMoo. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#">Privacy policy</a>
        <a href="#">Terms of service</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 64px 0 32px;
  border-top: 1px solid var(--border-subtle);
  background: rgba(0, 0, 0, 0.2);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  padding-bottom: 48px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.logo-icon {
  color: var(--accent-gold);
}

.footer-tagline {
  font-size: 0.9rem;
  color: var(--text-muted);
  max-width: 280px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.footer-col h4 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-gold);
  margin-bottom: 16px;
}

.footer-col ul {
  list-style: none;
}

.footer-col li {
  margin-bottom: 10px;
}

.footer-col a {
  font-size: 0.9rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.footer-col a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border-subtle);
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer-legal {
  display: flex;
  gap: 24px;
}

.footer-legal a:hover {
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>
