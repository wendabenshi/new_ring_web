<template>
  <div class="love-energy-page relative min-h-[100dvh] bg-[#18161D] text-white">
    <StarfieldBackground />

    <!-- <SiteHeader /> -->
    <DrawToast :message="toastMessage" />

    <ReadingPanel
      :visible="showReading"
      :loading="readingLoading"
      :question="submittedQuestion"
      :reading="readingText"
      :slots="readingSlots"
      @close="resetSession"
    />

    <main class="relative z-[1] min-h-[100dvh] pt-16">
      <section class="relative isolate min-h-[100dvh] overflow-x-hidden">
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-32"
          style="background: linear-gradient(to bottom, transparent 0%, #18161D 100%);"
          aria-hidden="true"
        />

        <div class="relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col items-center px-4 pt-16 pb-0 md:pt-20">
          <div class="relative z-20 mx-auto w-full max-w-3xl space-y-4 text-center">
            <p class="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#7C74E7]/80">
              Love Energy
            </p>

            <h1 class="font-serif text-2xl font-normal leading-tight text-white sm:text-3xl md:text-4xl">
              Close your eyes.<br />
              Bring your question to mind.
            </h1>

            <p class="text-xs text-white/35 md:text-sm">The cards are listening</p>

            <QuestionBar
              v-model="question"
              :submitted="submitted"
              :submitted-question="submittedQuestion"
              @submit="onSubmit"
            />

            <CardSlots
              :visible="submitted"
              :draw="draw"
              :picked-count="pickedFanIndices.length"
              :flipped="flippedSlots"
            />

            <div
              class="draw-collapse"
              :class="{ 'draw-collapse--closed': submitted }"
              :aria-hidden="submitted"
            >
              <div class="overflow-hidden" style="min-height: 0;">
                <div class="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    v-for="chip in suggestionChips"
                    :key="chip"
                    type="button"
                    class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/55 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white/85 md:text-xs"
                    @click="selectChip(chip)"
                  >
                    {{ chip }}
                  </button>
                </div>
              </div>
            </div>

            <div
              class="draw-collapse"
              :class="{ 'draw-collapse--closed': submitted }"
              :aria-hidden="submitted"
            >
              <div class="overflow-hidden" style="min-height: 0;">
                <a
                  href="#"
                  class="inline-block text-[10px] text-[#7C74E7]/40 transition-colors hover:text-[#7C74E7]/70 md:text-xs"
                >
                  or try today's free daily reading
                </a>
              </div>
            </div>
          </div>

          <CardFan
            class="relative z-10 w-full"
            :active="submitted"
            :picking-enabled="pickingEnabled"
            :picked-indices="pickedFanIndices"
            :picks-remaining="picksRemaining"
            @pick="onPickCard"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import CardFan from "../components/draw/CardFan.vue";
import CardSlots from "../components/draw/CardSlots.vue";
import DrawToast from "../components/draw/DrawToast.vue";
import QuestionBar from "../components/draw/QuestionBar.vue";
import ReadingPanel from "../components/draw/ReadingPanel.vue";
import SiteHeader from "../components/SiteHeader.vue";
import StarfieldBackground from "../components/StarfieldBackground.vue";
import { resolveSlotCards, simulateDraw, simulateInterpret } from "../services/drawSession.js";

const question = ref("When will real love show up?");
const submitted = ref(false);
const submittedQuestion = ref("");
const draw = ref(null);
const pickedFanIndices = ref([]);
const flippedSlots = ref([false, false, false]);
const pickingEnabled = ref(false);
const showReading = ref(false);
const readingLoading = ref(false);
const readingText = ref("");
const toastMessage = ref("");

const suggestionChips = [
  "Will I find love this year?",
  "Is he the one?",
  "When will love come?",
];

const picksRemaining = computed(() => Math.max(0, 3 - pickedFanIndices.value.length));

const readingSlots = computed(() => {
  if (!draw.value) return [];
  const cards = resolveSlotCards(draw.value);
  return cards.map((card, index) => ({
    label: card.label,
    position: draw.value.position_meanings[index] ?? "",
  }));
});

const timers = [];

function schedule(fn, ms) {
  timers.push(window.setTimeout(fn, ms));
}

function showToast(message) {
  toastMessage.value = message;
  schedule(() => {
    toastMessage.value = "";
  }, 2500);
}

function selectChip(text) {
  question.value = text;
}

async function onSubmit(text) {
  submittedQuestion.value = text;
  submitted.value = true;
  pickingEnabled.value = false;
  draw.value = null;
  pickedFanIndices.value = [];
  flippedSlots.value = [false, false, false];
  showReading.value = false;
  readingText.value = "";

  try {
    draw.value = await simulateDraw(text);
    schedule(() => {
      pickingEnabled.value = true;
    }, 900);
  } catch {
    showToast("The cards aren't speaking right now");
    submitted.value = false;
  }
}

function onPickCard(fanIndex) {
  if (!pickingEnabled.value) return;
  if (!draw.value) {
    showToast("Bring your question to mind first");
    return;
  }
  if (pickedFanIndices.value.includes(fanIndex) || pickedFanIndices.value.length >= 3) return;

  const slotIndex = pickedFanIndices.value.length;
  pickedFanIndices.value = [...pickedFanIndices.value, fanIndex];

  schedule(() => {
    flippedSlots.value = flippedSlots.value.map((value, index) =>
      index === slotIndex ? true : value,
    );
  }, 60);

  if (pickedFanIndices.value.length === 3) {
    pickingEnabled.value = false;
    schedule(() => {
      openReading();
    }, 1400);
  }
}

async function openReading() {
  showReading.value = true;
  readingLoading.value = true;
  readingText.value = "";

  try {
    readingText.value = await simulateInterpret(submittedQuestion.value, draw.value);
  } catch {
    readingText.value = "The cards drew close, but the reading couldn't fully arrive. Try again when you're ready.";
  } finally {
    readingLoading.value = false;
  }
}

function resetSession() {
  showReading.value = false;
  readingLoading.value = false;
  readingText.value = "";
  submitted.value = false;
  submittedQuestion.value = "";
  draw.value = null;
  pickedFanIndices.value = [];
  flippedSlots.value = [false, false, false];
  pickingEnabled.value = false;
}

onBeforeUnmount(() => {
  timers.forEach(clearTimeout);
});
</script>

<style scoped>
.draw-collapse {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  transition:
    grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
    margin-top 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.draw-collapse--closed {
  grid-template-rows: 0fr;
  opacity: 0;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .draw-collapse {
    transition: none !important;
  }
}
</style>
