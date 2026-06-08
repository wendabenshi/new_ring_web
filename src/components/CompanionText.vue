<template>
  <div
    class="companion-text flex w-full flex-col items-center text-center"
    :class="{ 'companion-text--visible': visible }"
  >
    <h1 class="companion-text__headline mb-3 font-serif text-[1.55rem] font-normal tracking-[0.01em] text-white">
      <span :key="headline" class="companion-text__headline-inner">{{ headline }}</span>
    </h1>

    <p class="companion-text__sub mb-0 max-w-[280px] font-serif text-[0.92rem] font-normal leading-[1.65] text-white/45">
      Take a breath. You’re not alone.
    </p>

    <div
      class="companion-text__btn-wrap group/btn relative mt-[clamp(3.5rem,3vh,5.5rem)] mb-[clamp(2.5rem,4vh,4rem)] flex items-center justify-center"
    >
      <span class="companion-text__btn-glow" aria-hidden="true" />
      <span class="companion-text__btn-glow companion-text__btn-glow--outer" aria-hidden="true" />

      <button
        type="button"
        class="companion-text__btn relative z-[1] flex h-[90px] w-[90px] flex-col items-center justify-center rounded-full border border-solid border-white bg-transparent font-serif text-[0.82rem] font-normal tracking-[0.02em] text-white/88 transition-all duration-500 hover:border-white hover:text-white active:scale-[0.97]"
      @click="goToDraw"
      @mouseenter="emitGather(true)"
      @mouseleave="emitGather(false)"
      @touchstart.passive="emitGather(true)"
      @touchend.passive="emitGather(false)"
      @touchcancel.passive="emitGather(false)"
    >
      <span>I’m ready</span>
      <span class="mt-2 text-[0.95rem] leading-none text-white/70 transition-transform duration-500 group-hover/btn:translate-x-0.5">
        →
      </span>
      </button>
    </div>

    <div class="companion-text__footer flex flex-col items-center gap-2.5">
      <div class="companion-text__touch-icon" aria-hidden="true">
        <span class="companion-text__touch-dot" />
      </div>
      <p class="font-serif text-[0.72rem] font-normal tracking-[0.04em] text-white/38">
        Touch your ring
      </p>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

defineProps({
  visible: { type: Boolean, default: true },
});

const emit = defineEmits(["gather"]);
const router = useRouter();

const headline = ref("I’m here.");
let textTimer = null;

function emitGather(active) {
  emit("gather", active);
}

function goToDraw() {
  router.push("/draw/love-energy");
}

onMounted(() => {
  textTimer = window.setTimeout(() => {
    headline.value = "Take your time.";
  }, 8000);
});

onBeforeUnmount(() => {
  if (textTimer) clearTimeout(textTimer);
});
</script>

<style scoped>
.companion-text {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 1.4s ease 0.4s,
    transform 1.4s ease 0.4s;
}

.companion-text--visible {
  opacity: 1;
  transform: translateY(0);
}

.companion-text__btn-wrap {
  isolation: isolate;
}

.companion-text__btn-glow {
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(184, 164, 255, 0.14) 42%,
    transparent 72%
  );
  box-shadow:
    0 0 24px rgba(255, 255, 255, 0.14),
    0 0 48px rgba(124, 116, 231, 0.2),
    0 0 80px rgba(124, 116, 231, 0.12);
  animation: btnGlowPulse 4.5s ease-in-out infinite;
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease;
}

.companion-text__btn-glow--outer {
  width: 148px;
  height: 148px;
  border: none;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(184, 164, 255, 0.1) 38%,
    rgba(124, 116, 231, 0.08) 58%,
    transparent 78%
  );
  filter: blur(16px);
  box-shadow:
    0 0 48px rgba(255, 255, 255, 0.12),
    0 0 88px rgba(124, 116, 231, 0.18);
  animation: btnGlowRing 4.5s ease-in-out infinite;
}

.companion-text__btn-wrap:hover .companion-text__btn-glow--outer {
  box-shadow:
    0 0 56px rgba(255, 255, 255, 0.15),
    0 0 104px rgba(124, 116, 231, 0.22);
}

.companion-text__btn-wrap:hover .companion-text__btn-glow {
  box-shadow:
    0 0 28px rgba(255, 255, 255, 0.22),
    0 0 56px rgba(124, 116, 231, 0.28),
    0 0 96px rgba(184, 164, 255, 0.16);
}

.companion-text__btn {
  border-width: 1px;
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.09),
    inset 0 0 12px rgba(255, 255, 255, 0.04);
}

.companion-text__btn:hover {
  box-shadow:
    0 0 26px rgba(255, 255, 255, 0.18),
    0 0 44px rgba(124, 116, 231, 0.16),
    inset 0 0 14px rgba(255, 255, 255, 0.06);
}

@keyframes btnGlowPulse {
  0%,
  100% {
    opacity: 0.65;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.06);
  }
}

@keyframes btnGlowRing {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.82;
    transform: scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .companion-text__btn-glow {
    animation: none;
    opacity: 0.75;
  }

  .companion-text__btn-glow--outer {
    animation: none;
    opacity: 0.5;
  }
}

.companion-text__headline-inner {
  display: inline-block;
  animation: headlineSwap 1.2s ease;
}

.companion-text__touch-icon {
  width: 18px;
  height: 28px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5px;
}

.companion-text__touch-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
}

@keyframes headlineSwap {
  0% {
    opacity: 0;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
