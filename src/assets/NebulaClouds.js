const SIN = new Float32Array(1024);
const COS = new Float32Array(1024);

for (let i = 0; i < 1024; i += 1) {
  const angle = (i / 1024) * Math.PI * 2;
  SIN[i] = Math.sin(angle);
  COS[i] = Math.cos(angle);
}

const lookup = (table, angle) => {
  const normalized = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return table[1023 & Math.floor((normalized / (Math.PI * 2)) * 1024)];
};

const sinL = (angle) => lookup(SIN, angle);
const cosL = (angle) => lookup(COS, angle);

/** Lower = softer, paler blue-purple stripes */
const STRIPE_STRENGTH = 0.62;
const STRIPE_FLOOR = 0.22;

export default class NebulaClouds {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.halfW = 0;
    this.halfH = 0;
    this.imageData = null;
    this.pixels = null;
    this.startTime = Date.now();
    this.rafId = null;
    this.running = true;
    this.visible = true;

    this._resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.canvas.width = w;
      this.canvas.height = h;
      this.halfW = Math.floor(w / 2);
      this.halfH = Math.floor(h / 2);
      this.imageData = this.ctx.createImageData(this.halfW, this.halfH);
      this.pixels = this.imageData.data;
    };

    this._draw = () => {
      if (!this.running || !this.visible) return;

      const { ctx, canvas, halfW, halfH, pixels } = this;
      const time = (Date.now() - this.startTime) * 0.001;

      for (let row = 0; row < halfH; row += 1) {
        for (let col = 0; col < halfW; col += 1) {
          const nx = (2 * col - halfW) / halfH;
          const ny = (2 * row - halfH) / halfH;

          let h = 0;
          let s = 0;
          for (let i = 0; i < 4; i += 1) {
            h += cosL(i - s + 0.3 * time - h * nx);
            s += sinL(i * ny + h);
          }

          const m = STRIPE_FLOOR + STRIPE_STRENGTH * ((sinL(h) + cosL(s)) * 0.5);
          const d = 0.42 * cosL(2 * s + 0.15 * time);
          const mix = 0.24 * sinL(1.5 * h + 0.2 * time);

          const r = Math.max(0, Math.min(1, 0.48 * d + mix)) * m;
          const g = Math.max(0, Math.min(1, 0.42 * d + 0.52 * mix)) * m;
          const b = Math.max(0, Math.min(1, 0.88 * d + 0.12 * mix)) * m;
          const idx = (row * halfW + col) * 4;

          pixels[idx] = 255 * r;
          pixels[idx + 1] = 255 * g;
          pixels[idx + 2] = 255 * b;
          pixels[idx + 3] = 255;
        }
      }

      ctx.putImageData(this.imageData, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, halfW, halfH, 0, 0, canvas.width, canvas.height);

      this.rafId = requestAnimationFrame(this._draw);
    };

    this._onVisibility = () => {
      if (document.hidden) {
        if (this.rafId) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      } else if (this.running && this.visible && !this.rafId) {
        this.rafId = requestAnimationFrame(this._draw);
      }
    };

    this._observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = this.visible;
        this.visible = entry.isIntersecting;
        if (this.visible && !wasVisible && this.running && !this.rafId) {
          this.rafId = requestAnimationFrame(this._draw);
        } else if (!this.visible && this.rafId) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      },
      { threshold: 0 },
    );
  }

  start() {
    window.addEventListener("resize", this._resize);
    document.addEventListener("visibilitychange", this._onVisibility);
    this._observer.observe(this.canvas);
    this._resize();
    this.running = true;
    this.rafId = requestAnimationFrame(this._draw);
  }

  destroy() {
    this.running = false;
    window.removeEventListener("resize", this._resize);
    document.removeEventListener("visibilitychange", this._onVisibility);
    this._observer.disconnect();
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
}
