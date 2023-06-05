<script>
    import Countdown from './Countdown.svelte';
    import MSTTrial from './MSTTrial.svelte';

    export let done;
    export let countdownSeconds = 30;
    export let blockNumber;

    let isCountdownDone = false;
    function countdownDone() {
        isCountdownDone = true;
    }
</script>


{#if (!isCountdownDone) }        
    <Countdown {countdownSeconds} done={countdownDone}/>
{:else}
     <MSTTrial {done} {blockNumber} />
{/if}

