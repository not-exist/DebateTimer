<script lang="ts">
  import { timer } from "../lib/timer.svelte";

  let stage = $derived(timer.stage);

  let statusText = $derived(
    {
      idle: "未开始",
      running: "进行中",
      paused: "已暂停",
      finished: "已结束",
    }[timer.status],
  );

  let sideTone = $derived(
    stage?.side === "con" ? "text-con" : stage?.side === "pro" ? "text-pro" : "text-ink-muted",
  );

  let progress = $derived.by(() => {
    const slot = timer.slots.find((s) => s.id === timer.activeSlotId);
    if (!slot || slot.limitMs <= 0) return 0;
    return Math.min(100, ((slot.limitMs - slot.remainMs) / slot.limitMs) * 100);
  });
</script>

<div class="w-full max-w-3xl">
  <div class="flex items-baseline justify-center gap-3">
    <span class="text-xl font-medium {sideTone}">{stage?.name ?? "—"}</span>
    {#if stage?.speaker}
      <span class="text-sm text-ink-muted">· {stage.speaker}</span>
    {/if}
    <span class="ml-2 rounded border border-line px-2 py-0.5 text-xs text-ink-muted">
      {statusText}
    </span>
    <span class="text-xs text-ink-muted">第 {timer.stageIndex + 1} / {timer.stageCount} 环节</span>
  </div>

  <div class="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
    <div
      class="h-full rounded-full bg-accent transition-[width] duration-200"
      style="width: {progress}%"
    ></div>
  </div>
</div>
