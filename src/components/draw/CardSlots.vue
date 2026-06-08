<template>
  <div
    v-if="visible"
    class="flex items-center justify-center gap-4 sm:gap-6"
    style="transform: translateY(-32px);"
  >
    <div
      v-for="slot in 3"
      :key="slot"
      class="slot-item flex flex-col items-center gap-1.5"
      :style="{ animationDelay: `${(slot - 1) * 80}ms` }"
    >
      <div
        class="slot-card relative overflow-hidden rounded-lg"
        style="width: 70px; height: 112px; perspective: 1200px;"
      >
        <div
          v-if="isFilled(slot - 1)"
          class="slot-flip h-full w-full"
          :class="{ 'slot-flip--revealed': flipped[slot - 1] }"
        >
          <div class="slot-face slot-face--back absolute inset-0">
            <TarotCardBack />
          </div>
          <div class="slot-face slot-face--front absolute inset-0">
            <TarotCardFace :label="cardLabel(slot - 1)" />
          </div>
        </div>

        <div
          v-else
          class="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.03]"
        >
          <span class="text-lg font-light text-white/15">{{ slot }}</span>
        </div>
      </div>

      <span
        class="max-w-[84px] text-center text-[9px] leading-tight tracking-wide text-white/30"
        style="min-height: 22px;"
      >
        {{ positionLabel(slot - 1) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import TarotCardBack from "./TarotCardBack.vue";
import TarotCardFace from "./TarotCardFace.vue";

const props = defineProps({
  visible: { type: Boolean, default: false },
  draw: { type: Object, default: null },
  pickedCount: { type: Number, default: 0 },
  flipped: { type: Array, default: () => [false, false, false] },
});

function isFilled(index) {
  return props.pickedCount > index;
}

function positionLabel(index) {
  return props.draw?.position_meanings?.[index] ?? "";
}

function cardLabel(index) {
  return props.draw?.cards?.[index]?.card_name ?? "";
}
</script>

<style scoped>
.slot-item {
  animation: slotAppear 320ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.slot-flip {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.slot-flip--revealed {
  transform: rotateY(180deg);
}

.slot-face {
  backface-visibility: hidden;
  border-radius: 8px;
  overflow: hidden;
}

.slot-face--front {
  transform: rotateY(180deg);
}

@keyframes slotAppear {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .slot-item {
    animation: none !important;
  }

  .slot-flip {
    transition: none !important;
  }
}
</style>
