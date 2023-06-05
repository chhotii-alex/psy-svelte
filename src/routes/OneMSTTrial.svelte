<script>
    import StopBlock from './StopBlock.svelte';
    import GoBlock from './GoBlock.svelte';
    import ChunkSeriesRunner from './ChunkSeriesRunner.svelte';

    export let done;
    function chunkDone() {
       done();
    }

</script>

<ChunkSeriesRunner series={[StopBlock, GoBlock]} done={chunkDone}/>
