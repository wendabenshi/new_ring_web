<template>
  <div
    class="breathing-ring relative mx-auto aspect-square w-[min(80vw,340px)]"
    :class="{ 'breathing-ring--awake': awake, 'breathing-ring--formed': formed }"
  >
    <div
      class="breathing-ring__gather absolute inset-0 transition-transform duration-700 ease-out"
      :style="{ transform: `scale(${1 - gather * 0.035})` }"
    >
      <div class="breathing-ring__body absolute inset-0">
        <!-- ring visuals — inset shrinks band radius, canvas stays full size -->
        <div class="breathing-ring__visual absolute inset-[15%]">
          <div class="breathing-ring__bloom pointer-events-none absolute inset-[-20%] z-0 rounded-full" aria-hidden="true" />

          <!-- metal band base -->
          <div class="breathing-ring__shell absolute inset-[6%] z-[1] rounded-full" aria-hidden="true" />
          <div class="breathing-ring__shell absolute inset-[9%] z-[1] rounded-full" aria-hidden="true" />
          <!-- specular highlights — clipped to ring band, above metal -->
          <OrbitParticles :gather="gather" :active="formed" />
        </div>

        <!-- center pulse stays at canvas center -->
        <div class="breathing-ring__core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div
          class="breathing-ring__core-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import OrbitParticles from "./OrbitParticles.vue";

defineProps({
  awake: { type: Boolean, default: true },
  formed: { type: Boolean, default: true },
  gather: { type: Number, default: 0 },
});
</script>

<style scoped>
.breathing-ring__body {
  animation: breathe 12s ease-in-out infinite;
  transform-origin: center center;
  will-change: transform;
}

.breathing-ring__visual {
  isolation: isolate;
}

.breathing-ring__bloom {
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.07) 0%,
    rgba(255, 255, 255, 0.025) 38%,
    transparent 68%
  );
  opacity: 0;
  transition: opacity 2s ease;
}

.breathing-ring--formed .breathing-ring__bloom {
  opacity: 1;
}

/* polished metal band — subtle depth, highlights from canvas glints */
.breathing-ring__shell {
  padding: 2px;
  background: conic-gradient(
    from 210deg,
    rgba(42, 42, 42, 0.72) 0deg,
    rgba(78, 78, 78, 0.58) 55deg,
    rgba(48, 48, 48, 0.68) 120deg,
    rgba(36, 36, 36, 0.75) 195deg,
    rgba(72, 72, 72, 0.6) 250deg,
    rgba(42, 42, 42, 0.72) 360deg
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  box-shadow:
    0 0 24px rgba(255, 255, 255, 0.04),
    inset 0 0 12px rgba(255, 255, 255, 0.03);
  opacity: 0;
  transform: scale(0.94);
  transition:
    opacity 2.2s ease,
    transform 2.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.breathing-ring--formed .breathing-ring__shell {
  opacity: 1;
  transform: scale(1);
}

.breathing-ring__core {
  width: 5px;
  height: 5px;
  background: #ffffff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.85);
  opacity: 0;
  animation: corePulse 6s ease-in-out infinite;
  transition: opacity 1s ease;
}

.breathing-ring--awake .breathing-ring__core {
  opacity: 1;
}

.breathing-ring__core-glow {
  width: 18px;
  height: 18px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, transparent 70%);
  animation: coreHalo 6s ease-in-out infinite;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.breathing-ring--awake .breathing-ring__core-glow {
  opacity: 1;
}

@keyframes breathe {
  0%,
  100% {
    transform: scale(1);
  }
  33% {
    transform: scale(1.018);
  }
  50% {
    transform: scale(1.018);
  }
  83% {
    transform: scale(1);
  }
}

@keyframes corePulse {
  0%,
  100% {
    opacity: 0.75;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.15);
  }
}

@keyframes coreHalo {
  0%,
  100% {
    opacity: 0.35;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.65;
    transform: translate(-50%, -50%) scale(1.3);
  }
}
</style>
