<script lang="ts">
  import { fly } from "svelte/transition";
  import { timer } from "../lib/timer.svelte";
</script>

{#if timer.promptLabel}
  <div class="pointer-events-none flex justify-center" transition:fly={{ y: -16, duration: 260 }}>
    <div
      class="rounded-full px-6 py-2 text-lg font-semibold tracking-wide
             {timer.promptFlash ? 'animate-pulse' : ''}
             {timer.remainMs <= 0 ? 'bg-danger text-white' : 'bg-warn text-white'}"
    >
      {timer.promptLabel}
    </div>
  </div>
{/if}
