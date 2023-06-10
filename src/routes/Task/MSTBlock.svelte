<script>
    import { onMount } from 'svelte';

    import Countdown from './Countdown.svelte';
    import Blank from './Blank.svelte';
    import MSTTrial from './MSTTrial.svelte';
    import { getTrialId } from '../db.js';

    export let done;
    export let countdownSeconds = 30;
    export let blockNumber;
    export let beep;
    export let sessionId;

    let promise;
    onMount( () => { 
        promise = getTrialId(sessionId, blockNumber);
    });

    let isCountdownDone = false;
    function countdownDone() {
       isCountdownDone = true;
    }


</script>


{#if (!isCountdownDone) }        
    <Countdown {countdownSeconds} done={countdownDone} beep={beep} />
{:else}
     {#await promise}
        <Blank color={"red"} />
     {:then trialId}
        <MSTTrial {done} {blockNumber} trialId={trialId['id']} />
     {:catch error}
        <em> ERROR: {error.message} </em>
     {/await}
{/if}

