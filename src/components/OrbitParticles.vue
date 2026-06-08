<template>
  <canvas
    ref="canvasRef"
    class="orbit-particles pointer-events-none absolute inset-0 z-[2] h-full w-full"
    aria-hidden="true"
  />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  gather: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  bandOuterRatio: { type: Number, default: 0.44 },
  bandWidthPx: { type: Number, default: 2.5 },
});

const canvasRef = ref(null);
let rafId = null;
let running = true;
let gatherCurrent = 0;
let lastNow = 0;

let orbitAngle = -Math.PI / 3;
const orbitSpeed = 0.022;

function getBandMetrics(size) {
  const outerR = size * props.bandOuterRatio * (1 - gatherCurrent * 0.012);
  const innerR = outerR * 0.92;
  const bandW = outerR - innerR;
  const bandCenterR = Math.max(innerR + bandW * 0.12, (outerR + innerR) / 2 - bandW * 0.38);
  return { outerR, innerR, bandW, bandCenterR };
}

function clipToRingBand(ctx, cx, cy, outerR, innerR) {
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
  ctx.clip();
}

function drawSoftBlob(ctx, x, y, rx, ry, alpha) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
  g.addColorStop(0, `rgba(255,255,255,${alpha})`);
  g.addColorStop(0.45, `rgba(255,255,255,${alpha * 0.35})`);
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fill();
}

/** Blurry soft light spot on the ring band. */
function drawBlurryGlint(ctx, cx, cy, r, bandW, angle, alpha) {
  const x = cx + Math.cos(angle) * r;
  const y = cy + Math.sin(angle) * r;
  const along = Math.max(28, bandW * 10);
  const across = Math.max(2.2, bandW * 1.1);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);
  ctx.globalCompositeOperation = "screen";

  ctx.filter = "blur(25px)";
  drawSoftBlob(ctx, 0, 0, along * 0.95, across * 1.1, alpha * 0.28);

  ctx.filter = "blur(16px)";
  drawSoftBlob(ctx, 0, 0, along * 0.62, across * 0.95, alpha * 0.48);

  ctx.filter = "blur(10px)";
  drawSoftBlob(ctx, 0, 0, along * 0.38, across * 0.82, alpha * 0.72);

  ctx.filter = "blur(0px)";
  //drawSoftBlob(ctx, 0, 0, along * 0.18, across * 0.55, Math.min(1, alpha * 0.92));
  drawSoftBlob(ctx, 0, 0, along * 0.18, across * 0.55, Math.min(1, alpha * 1.1));
  ctx.restore();
}

function drawFrame(now) {
  if (!running) return;

  const canvas = canvasRef.value;
  if (!canvas) {
    rafId = requestAnimationFrame(drawFrame);
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    rafId = requestAnimationFrame(drawFrame);
    return;
  }

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (w < 2 || h < 2) {
    rafId = requestAnimationFrame(drawFrame);
    return;
  }

  const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0.026;
  lastNow = now;

  gatherCurrent += (props.gather - gatherCurrent) * 0.045;

  const cx = w / 2;
  const cy = h / 2;
  const size = Math.min(w, h);
  const { outerR, innerR, bandW, bandCenterR } = getBandMetrics(size);

  ctx.clearRect(0, 0, w, h);

  if (!props.active) {
    rafId = requestAnimationFrame(drawFrame);
    return;
  }

  const t = now / 1000;
  const speedMul = 0.97 + Math.sin(t * 0.15) * 0.03;
  orbitAngle += orbitSpeed * speedMul * dt;

  const pulse = 0.9 + Math.sin(t * 0.55) * 0.06;
  const alpha = pulse * (1.06 + gatherCurrent * 0.06);

  ctx.save();
  clipToRingBand(ctx, cx, cy, outerR, innerR);

  drawBlurryGlint(ctx, cx, cy, bandCenterR, bandW, orbitAngle, alpha);
  drawBlurryGlint(ctx, cx, cy, bandCenterR, bandW, orbitAngle + Math.PI, alpha * 0.97);

  ctx.restore();

  ctx.filter = "none";
  ctx.globalCompositeOperation = "source-over";

  rafId = requestAnimationFrame(drawFrame);
}

function resize() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext("2d");
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
}

let ro = null;

onMounted(() => {
  resize();
  ro = new ResizeObserver(resize);
  if (canvasRef.value) ro.observe(canvasRef.value);
  rafId = requestAnimationFrame(drawFrame);
});

onBeforeUnmount(() => {
  running = false;
  ro?.disconnect();
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.orbit-particles {
  mix-blend-mode: screen;
}
</style>
