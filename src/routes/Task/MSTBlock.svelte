<script>
    import Countdown from './Countdown.svelte';
    import MSTTrial from './MSTTrial.svelte';

    export let done;
    export let countdownSeconds = 30;
    export let blockNumber;
    export let beep;

    let isCountdownDone = false;
    function countdownDone() {
        isCountdownDone = true;
    }
</script>


{#if (!isCountdownDone) }        
    <Countdown {countdownSeconds} done={countdownDone} beep={beep} />
{:else}
     <MSTTrial {done} {blockNumber} />
{/if}

