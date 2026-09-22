<script lang="ts">
  import { timer } from "../lib/timer.svelte";
  import { formatClock } from "../core/format";

  let stage = $derived(timer.stage);
  let slots = $derived(timer.slots);

  function slotName(id: string): string {
    const s = slots.find((x) => x.id === id);
    if (!s) return id;
    if (stage?.timing.kind === "alternating") {
      return s.side === "pro" ? "正方" : "反方";
    }
    return s.label;
  }
</script>

{#if slots.length > 1}
  <div class="flex items-stretch justify-center gap-4">
    {#each slots as slot (slot.id)}
      {@const active = slot.id === timer.activeSlotId}
      <div
        class="min-w-40 rounded-lg border px-6 py-3 text-center transition-colors duration-200
               {active ? 'border-accent bg-surface' : 'border-line'}"
      >
        <div class="text-sm tracking-wide text-ink-muted">{slotName(slot.id)}</div>
        <div class="tnum text-3xl font-semibold {active ? 'text-ink' : 'text-ink-muted'}">
          {formatClock(slot.remainMs)}
        </div>
      </div>
    {/each}
  </div>
{/if}
