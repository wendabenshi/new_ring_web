<template>
  <Transition name="reading-fade">
    <div
      v-if="visible"
      class="reading-panel fixed inset-0 z-[1200] overflow-y-auto bg-[#18161D]/95 backdrop-blur-md"
    >
      <div class="mx-auto flex min-h-full w-full max-w-2xl flex-col px-5 py-12 md:px-8">
        <button
          type="button"
          class="mb-8 self-start text-xs text-white/45 transition hover:text-white/75"
          @click="$emit('close')"
        >
          ← Back to draw
        </button>

        <p class="text-[10px] uppercase tracking-[0.2em] text-[#7C74E7]/80">{{ readingLabel }}</p>

        <h2 class="mt-3 font-serif text-2xl font-normal leading-tight text-white md:text-3xl">
          {{ readingTitle }}
        </h2>

        <p class="mt-3 text-sm italic text-white/45">“{{ question }}”</p>

        <div v-if="loading" class="mt-10 flex flex-col items-center gap-4 py-16">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#B8A4FF]" />
          <p class="text-sm text-white/40">The cards are speaking…</p>
        </div>

        <template v-else>
          <div class="mt-8 flex items-start justify-center gap-4 sm:gap-6">
            <div
              v-for="(slot, index) in slots"
              :key="slot.label"
              class="flex max-w-[108px] flex-col items-center gap-2"
            >
              <div class="h-[112px] w-[70px] overflow-hidden rounded-lg ring-1 ring-white/10">
                <TarotCardFace :label="slot.label" />
              </div>
              <p class="text-center text-[9px] leading-tight text-white/30">{{ slot.position }}</p>
              <p class="text-center text-[11px] font-medium leading-tight text-[#ECEAE6]">{{ slot.label }}</p>
            </div>
          </div>

          <div
            class="reading-panel__text mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-6 md:px-7 md:py-8"
          >
            <p
              v-for="(paragraph, index) in paragraphs"
              :key="index"
              class="font-serif text-[0.95rem] leading-[1.85] text-white/72"
              :class="index > 0 ? 'mt-5' : ''"
            >
              {{ paragraph }}
            </p>
          </div>

          <button
            type="button"
            class="mt-8 inline-flex items-center justify-center self-center rounded-full bg-white px-6 py-3 text-sm font-medium text-[#18161D] transition hover:bg-white/90 active:scale-[0.98]"
            @click="$emit('close')"
          >
            {{ drawAgainLabel }}
          </button>
        </template>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";
import TarotCardFace from "./TarotCardFace.vue";

const props = defineProps({
  visible: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  question: { type: String, default: "" },
  reading: { type: String, default: "" },
  readingLabel: { type: String, default: "Love Energy Reading" },
  readingTitle: { type: String, default: "Your three-card reading" },
  drawAgainLabel: { type: String, default: "Draw again" },
  slots: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["close"]);

const paragraphs = computed(() =>
  props.reading
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean),
);
</script>

<style scoped>
.reading-fade-enter-active,
.reading-fade-leave-active {
  transition: opacity 280ms ease;
}

.reading-fade-enter-from,
.reading-fade-leave-to {
  opacity: 0;
}
</style>
