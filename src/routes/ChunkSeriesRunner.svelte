<script>
    export let series;
    export let done;

    let index = 0;
    function chunkDone() {
       index++;
       if (index >= series.length) {
          done();
       }
    }
    $: c = series[index];
</script>

<svelte:component this={c} done={chunkDone} />
