<template>
  <div class="w-full flex-1 flex flex-col justify-end">
    <p class="text-center text-[10px] md:text-xs text-white/30 mb-3">
      {{ hintText }}
    </p>

    <div
      ref="containerRef"
      class="relative w-full overflow-visible select-none touch-none"
      :class="active ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'"
      :style="{ height: `${containerHeight}px` }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div
        class="absolute left-1/2"
        :style="{ top: `${pivotY}px`, width: 0, height: 0 }"
      >
        <div
          v-for="card in renderCards"
          :key="card.key"
          data-fan-card
          :data-deck-index="card.deckIndex"
          class="absolute rounded-xl overflow-hidden"
          :style="cardStyle(card.angle, card.deckIndex)"
          @pointerdown="onCardPointerDown(card.deckIndex, $event)"
        >
          <div class="h-full w-full">
            <TarotCardBack />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import TarotCardBack from "./TarotCardBack.vue";

const props = defineProps({
  active: { type: Boolean, default: false },
  pickingEnabled: { type: Boolean, default: false },
  pickedIndices: { type: Array, default: () => [] },
  picksRemaining: { type: Number, default: 3 },
  cardCount: { type: Number, default: 52 },
});

const emit = defineEmits(["pick"]);

const CARD_W = 130;
const CARD_H = 208;
const RADIUS = 980;
const TAU = Math.PI * 2;
const CONTAINER_HEIGHT = 496;
const DRAG_THRESHOLD = 8;
/** Extra deck copies for seamless wrap while rotating */
const DECK_LAPS = 3;
const VISIBLE_ARC = Math.PI * 0.52;

const containerRef = ref(null);
const rotation = ref(0);
const isDragging = ref(false);
const containerHeight = ref(CONTAINER_HEIGHT);
const pivotY = ref(RADIUS + CARD_H + 20);

const renderCards = computed(() => {
  const total = props.cardCount;
  const items = [];
  for (let lap = 0; lap < DECK_LAPS; lap += 1) {
    for (let index = 0; index < total; index += 1) {
      const slot = lap * total + index;
      const angle = (slot / total) * TAU + rotation.value;
      items.push({
        key: `${lap}-${index}`,
        deckIndex: index,
        angle,
      });
    }
  }
  return items;
});

const hintText = computed(() => {
  if (!props.active) return "Ask your question to begin";
  if (!props.pickingEnabled) return "Preparing the deck…";
  if (props.picksRemaining <= 0) return "Your cards are chosen";
  return `Swipe to explore · tap ${props.picksRemaining} card${props.picksRemaining > 1 ? "s" : ""}`;
});

let dragging = false;
let dragMoved = false;
let startX = 0;
let startRotation = 0;
let activePointerId = null;
let pressedCardIndex = null;
let ro = null;

function wrapAngle(angle) {
  return ((angle % TAU) + TAU) % TAU;
}

function distanceFromCenter(angle) {
  const wrapped = wrapAngle(angle);
  return Math.min(wrapped, TAU - wrapped);
}

function normalizeRotation() {
  rotation.value = wrapAngle(rotation.value);
}

function updateLayout() {
  const h = containerRef.value?.clientHeight ?? CONTAINER_HEIGHT;
  containerHeight.value = h;
  pivotY.value = RADIUS + CARD_H + 20;
}

function cardStyle(angle, deckIndex) {
  const x = Math.sin(angle) * RADIUS - CARD_W / 2;
  const y = -Math.cos(angle) * RADIUS - CARD_H;
  const deg = (angle * 180) / Math.PI;
  const centerDist = distanceFromCenter(angle) / VISIBLE_ARC;
  const picked = props.pickedIndices.includes(deckIndex);
  const baseFade = props.active ? Math.max(0.1, 1 - centerDist * 0.86) : 0;
  const fade = picked ? baseFade * 0.18 : baseFade;
  const z = Math.round(100 - centerDist * 80);

  return {
    width: `${CARD_W}px`,
    height: `${CARD_H}px`,
    left: `${x}px`,
    top: `${y}px`,
    transform: `rotate(${deg}deg) scale(${picked ? 0.94 : 1})`,
    transformOrigin: "center bottom",
    opacity: fade,
    zIndex: picked ? 1 : z,
    transition: isDragging.value ? "opacity 0.35s ease" : "opacity 0.35s ease, transform 0.35s ease",
    pointerEvents: props.active && !picked && fade > 0.08 ? "auto" : "none",
  };
}

function onCardPointerDown(index, event) {
  if (!props.active || props.pickedIndices.includes(index)) return;
  pressedCardIndex = index;
}

function onPointerDown(event) {
  if (!props.active) return;

  const onCard = event.target.closest?.("[data-fan-card]");
  if (!onCard) {
    pressedCardIndex = null;
  } else {
    const deckIndex = Number(onCard.dataset.deckIndex);
    pressedCardIndex = Number.isFinite(deckIndex) ? deckIndex : null;
  }

  dragging = true;
  dragMoved = false;
  isDragging.value = false;
  activePointerId = event.pointerId;
  startX = event.clientX;
  startRotation = rotation.value;
  containerRef.value?.setPointerCapture?.(event.pointerId);
}

function onPointerMove(event) {
  if (!dragging || event.pointerId !== activePointerId) return;

  const delta = event.clientX - startX;
  if (!dragMoved && Math.abs(delta) >= DRAG_THRESHOLD) {
    dragMoved = true;
    isDragging.value = true;
  }

  if (dragMoved) {
    rotation.value = startRotation + delta * 0.0045;
  }
}

function onPointerUp(event) {
  if (event.pointerId !== activePointerId) return;

  if (
    props.pickingEnabled &&
    !dragMoved &&
    pressedCardIndex !== null &&
    !props.pickedIndices.includes(pressedCardIndex)
  ) {
    emit("pick", pressedCardIndex);
  }

  dragging = false;
  isDragging.value = false;
  activePointerId = null;
  pressedCardIndex = null;
  normalizeRotation();
}

onMounted(() => {
  updateLayout();
  ro = new ResizeObserver(updateLayout);
  if (containerRef.value) ro.observe(containerRef.value);
});

onBeforeUnmount(() => {
  dragging = false;
  ro?.disconnect();
});
</script>
