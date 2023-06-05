<script>
   export let component;
   export let reps;
   export let done;

    const range = (start, stop, step) =>
         Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

   let index = 0;
   function chunkDone() {
      index++;
      if (index >= reps) {
         done();
      }
   }
</script>

{#each range(0, (reps-1), 1) as i}
   {#if (i == index)}
       <svelte:component this={component} done={chunkDone} />
   {/if}
{/each}
