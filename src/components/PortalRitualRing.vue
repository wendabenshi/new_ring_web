<template>
  <div
    class="portal-ritual-ring"
    :class="className"
    :style="{ width: `${size}px`}"
  >
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  createParticles,
  createRadialParticles,
  isLikelyLowPowerDevice,
  startPortalRitualRing,
} from "../assets/portalRitualRing.js";

const props = defineProps({
  size: { type: Number, default: 260 },
  className: { type: String, default: "" },
});

const canvasRef = ref(null);
let cleanup = null;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const lowPower = isLikelyLowPowerDevice();
  const particles = createParticles(11, lowPower ? 170 : 240);
  const radialParticles = createRadialParticles(29, lowPower ? 160 : 220);
	if ("vibrate" in navigator) {
		navigator.vibrate(150);
	} else {
		alert("设备不支持震动 API");
	}
  cleanup = startPortalRitualRing(canvas, {
    lowPower,
    particles,
    radialParticles,
  });
});

onBeforeUnmount(() => {
  cleanup?.();
  cleanup = null;
});
</script>

<style scoped>
	canvas{
		width: 100%;
	}
  .portal-ritual-ring{
    margin:-10px auto;
  }
.portal-ritual-ring__glow {
  inset: -2.5rem;
  background: radial-gradient(
    circle at center,
    rgba(139, 92, 246, 0.14),
    rgba(59, 7, 100, 0.07) 50%,
    rgba(5, 3, 6, 0) 76%
  );
  filter: blur(22px);
  opacity: 0.9;
}
</style>
