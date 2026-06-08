<template>
  <section id="download" class="cta">
    <div class="container cta-inner">
      <div class="cta-glow" aria-hidden="true" />
      <h2 class="section-title cta-title">
        The next card<br />
        is <span class="emphasis">already turning.</span>
      </h2>
      <p class="section-desc cta-desc">
        Get the app — your first reading is on us.
      </p>
      <div class="store-buttons">
        <a href="#" class="store-btn" aria-label="Download on App Store">
          <span class="store-icon">&#63743;</span>
          <span>
            <small>Download on the</small>
            App Store
          </span>
        </a>
        <a href="#" class="store-btn" aria-label="Get it on Google Play">
          <span class="store-icon play">▶</span>
          <span>
            <small>Get it on</small>
            Google Play
          </span>
        </a>
      </div>
      <p class="cta-meta">4.6 · App Store · 500K+ Seekers</p>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding: 100px 0;
}

.cta-inner {
  position: relative;
  text-align: center;
  padding: 80px 40px;
  border-radius: 32px;
  background: linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg-card) 100%);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(139, 108, 184, 0.15) 0%, transparent 60%);
  pointer-events: none;
}

.cta-title,
.cta-desc {
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.cta-desc {
  margin-bottom: 36px;
}

.store-buttons {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
}

.store-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  transition: border-color 0.2s, transform 0.2s;
}

.store-btn:hover {
  border-color: var(--accent-gold);
  transform: translateY(-2px);
}

.store-btn small {
  display: block;
  font-size: 0.65rem;
  font-weight: 400;
  opacity: 0.8;
}

.store-icon {
  font-size: 1.75rem;
}

.store-icon.play {
  font-size: 1.25rem;
  color: var(--accent-gold);
}

.cta-meta {
  position: relative;
  font-size: 0.9rem;
  color: var(--text-muted);
}
</style>
