<template>
  <Transition name="toast-fade">
    <div
      v-if="message"
      class="pointer-events-none fixed left-1/2 z-[1100] -translate-x-1/2 px-4"
      style="top: 80px;"
      aria-live="polite"
      role="status"
    >
      <div
        class="rounded-full border border-[#FF8A3C]/40 px-5 py-2.5 text-xs text-[#FFD0A8] md:text-sm"
        style="
          background-color: rgba(58, 30, 16, 0.85);
          backdrop-filter: blur(24px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 24px rgba(255, 138, 60, 0.18);
        "
      >
        {{ message }}
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  message: { type: String, default: "" },
});
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition:
    opacity 240ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
