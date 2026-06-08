<template>
  <div class="hero-page relative flex min-h-[100dvh] w-full justify-center overflow-hidden bg-[#18161D]">
    <StarfieldBackground />

    <!-- intro veil -->
    <div
      class="pointer-events-none absolute inset-0 z-30 bg-black transition-opacity duration-700 ease-out"
      :class="introDone ? 'opacity-0' : 'opacity-100'"
      aria-hidden="true"
    />

    <div
      class="hero-page__frame relative z-10 flex w-full max-w-[430px] flex-col"
      style="min-height: min(100dvh, calc(100vw * 16 / 9)); max-height: 100dvh;"
    >
    <!--
      <!-- header -->
      <!-- <header
        class="flex shrink-0 items-center justify-between px-7 pt-[max(1.35rem,env(safe-area-inset-top))] pb-4"
      >
        <div
          class="flex items-center gap-2.5 transition-opacity duration-1000"
          :class="introDone ? 'opacity-100' : 'opacity-0'"
        >
          <span
            class="inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-white/70"
            aria-hidden="true"
          />
          <span class="text-[0.72rem] font-normal tracking-[0.28em] text-white/88 uppercase">
            WOOMOO
          </span>
        </div>

        <nav
          class="flex items-center gap-5 transition-opacity duration-1000"
          :class="introDone ? 'opacity-100' : 'opacity-0'"
        >
          <a href="#" class="text-[0.72rem] font-normal tracking-[0.02em] text-white/42 hover:text-white/65">
            Journal
          </a>
          <a href="#" class="text-[0.72rem] font-normal tracking-[0.02em] text-white/42 hover:text-white/65">
            About
          </a>
          <button
            type="button"
            class="ml-0.5 flex h-8 w-8 flex-col items-center justify-center gap-[5px] text-white/55"
            aria-label="Menu"
          >
            <span class="block h-px w-[18px] bg-current" />
            <span class="block h-px w-[18px] bg-current" />
            <span class="block h-px w-[18px] bg-current" />
          </button>
        </nav>
      </header> -->
      <!-- ring -->
      <div class="flex shrink-0 flex-col items-center px-6 pt-5 pb-5">
        <BreathingRing
          :awake="ringAwake"
          :formed="ringFormed"
          :gather="gatherAmount"
        />
      </div>

      <!-- copy + button + footer -->
      <div class="flex flex-1 flex-col pb-[max(1.75rem,env(safe-area-inset-bottom))]">
        <CompanionText :visible="textVisible" @gather="onGather" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import BreathingRing from "./BreathingRing.vue";
import CompanionText from "./CompanionText.vue";
import StarfieldBackground from "./StarfieldBackground.vue";
import supabase from '../supabase/index.js'
const introDone = ref(false);
const ringAwake = ref(false);
const ringFormed = ref(false);
const textVisible = ref(false);
const gatherAmount = ref(0);

const timers = [];

function schedule(fn, ms) {
  timers.push(window.setTimeout(fn, ms));
}

function onGather(active) {
  gatherAmount.value = active ? 1 : 0;
}

onMounted(() => {
	
  schedule(()=>{
	  supabase
	    .from('page_tokens')
	    .select("*").eq("id",8)
	    .then(({ data, error }) => {
	      if (error) {
	        console.error('查询失败:', error)
	      } else {
	        console.log('查询成功:', data)
	      }
	    })

  },100);
  schedule(() => {
    introDone.value = true;
    ringAwake.value = true;
  }, 100);
	
  schedule(() => {
    ringFormed.value = true;
  }, 100);

  schedule(() => {
    textVisible.value = true;
  }, 100);
});

onBeforeUnmount(() => {
  timers.forEach(clearTimeout);
});
</script>

<style scoped>
.hero-page__frame {
  aspect-ratio: 9 / 16;
}

@media (min-aspect-ratio: 9/16) {
  .hero-page__frame {
    height: 100dvh;
    max-height: 100dvh;
  }
}
</style>
