<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<div class="h-screen w-screen overflow-hidden bg-canvas text-ink">
  {@render children()}
</div>
