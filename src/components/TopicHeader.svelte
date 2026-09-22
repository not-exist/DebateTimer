<script lang="ts">
  import { config } from "../lib/config.svelte";

  interface Props {
    editing: "topic" | "pro" | "con" | null;
    onEdit: (target: "topic" | "pro" | "con" | null) => void;
  }
  let { editing, onEdit }: Props = $props();

  function commit() {
    onEdit(null);
    config.save();
  }
</script>

<header class="flex w-full items-center justify-between gap-6 px-10 pt-8">
  <div class="min-w-0 flex-1">
    {#if editing === "topic"}
      <input
        class="w-full border-b border-line bg-transparent text-2xl font-medium outline-none focus:border-accent"
        bind:value={config.match.topic}
        onblur={commit}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") {
            e.stopPropagation();
            commit();
          }
        }}
      />
    {:else}
      <button
        class="truncate text-2xl font-medium tracking-tight hover:text-accent"
        onclick={() => onEdit("topic")}
      >
        {config.match.topic}
      </button>
    {/if}
    <div class="mt-1 text-xs text-ink-muted">点击辩题可修改（快捷键 T）</div>
  </div>

  <div class="flex shrink-0 items-center gap-4 text-lg">
    {#if editing === "pro"}
      <input
        class="w-24 border-b border-line bg-transparent text-right outline-none focus:border-accent"
        bind:value={config.match.proName}
        onblur={commit}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") {
            e.stopPropagation();
            commit();
          }
        }}
      />
    {:else}
      <button class="font-medium text-pro hover:underline" onclick={() => onEdit("pro")}>
        {config.match.proName}
      </button>
    {/if}

    <span class="text-ink-muted">VS</span>

    {#if editing === "con"}
      <input
        class="w-24 border-b border-line bg-transparent outline-none focus:border-accent"
        bind:value={config.match.conName}
        onblur={commit}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") {
            e.stopPropagation();
            commit();
          }
        }}
      />
    {:else}
      <button class="font-medium text-con hover:underline" onclick={() => onEdit("con")}>
        {config.match.conName}
      </button>
    {/if}
  </div>
</header>
