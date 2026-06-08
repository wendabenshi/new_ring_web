<template>
  <div
    class="relative h-full w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10"
    style="filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));"
  >
    <img
      :src="cardImageSrc"
      alt=""
      class="pointer-events-none absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      draggable="false"
    />
  </div>
</template>

<script setup>
const cardImageSrc = "/cards/the-fool.png";
</script>
