<script lang="ts">
  import { timer } from "../lib/timer.svelte";
  import { ADJUST_STEP_MS } from "../core/hotkeys";

  interface Props {
    visible: boolean;
    onHelp: () => void;
    onSettings: () => void;
  }
  let { visible, onHelp, onSettings }: Props = $props();

  const btn =
    "rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:border-accent hover:text-accent active:bg-surface";
</script>

<div
  class="flex items-center justify-center gap-3 px-10 pb-8 transition-opacity duration-300
         {visible ? 'opacity-100' : 'opacity-0'}"
>
  <button class={btn} onclick={() => timer.toggle()}>
    {timer.status === "running" ? "暂停" : "开始"}
  </button>
  <button class={btn} onclick={() => timer.prev()}>上一环节</button>
  <button class={btn} onclick={() => timer.next()}>下一环节</button>
  <button class={btn} onclick={() => timer.reset()}>重置</button>
  <button class={btn} onclick={() => timer.adjust(-ADJUST_STEP_MS)}>−10 秒</button>
  <button class={btn} onclick={() => timer.adjust(ADJUST_STEP_MS)}>+10 秒</button>
  <button class={btn} onclick={() => timer.switchSide()}>切换发言方</button>
  <button class={btn} onclick={onSettings}>赛制</button>
  <button class={btn} onclick={onHelp}>快捷键</button>
</div>
