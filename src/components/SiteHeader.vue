<template>
  <header class="fixed top-0 left-0 right-0 z-[1000] w-full">
    <div
      class="mx-auto w-full border-b border-white/[0.08]"
      style="
        backdrop-filter: blur(24px) saturate(140%);
        -webkit-backdrop-filter: blur(24px) saturate(140%);
        background: rgba(36, 34, 40, 0.6);
      "
    >
      <div class="relative flex h-16 w-full items-center justify-between px-4 md:px-12">
        <button
          type="button"
          class="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label="Toggle menu"
        >
          <span class="block h-0.5 w-6 bg-white" />
          <span class="block h-0.5 w-6 bg-white" />
          <span class="block h-0.5 w-6 bg-white" />
        </button>

        <RouterLink to="/" class="hidden md:flex items-center gap-2.5" aria-label="WooMoo Home">
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 text-[10px] tracking-widest text-white/90"
          >
            W
          </span>
          <span class="text-[18px] font-semibold tracking-normal text-white">WooMoo</span>
        </RouterLink>

        <RouterLink to="/" class="md:hidden absolute left-1/2 -translate-x-1/2" aria-label="WooMoo Home">
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 text-[10px] tracking-widest text-white/90"
          >
            W
          </span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <a href="#" class="text-sm text-white/70 transition-colors hover:text-white">Tarot Meanings</a>
          <a href="#" class="text-sm text-white/70 transition-colors hover:text-white">Tarot Spreads</a>
          <a href="#" class="text-sm text-white/70 transition-colors hover:text-white">Team</a>
        </nav>

        <a
          href="#"
          aria-label="Download WooMoo"
          class="inline-flex items-center justify-center rounded-full bg-white text-[#18161D] shadow-md transition-all duration-300 hover:bg-white/90 active:scale-[0.96] h-10 w-10 md:h-11 md:w-auto md:px-6 md:gap-2 md:text-sm md:font-semibold"
        >
          <svg
            class="md:w-[18px] md:h-[18px]"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          <span class="hidden md:inline">Download</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
