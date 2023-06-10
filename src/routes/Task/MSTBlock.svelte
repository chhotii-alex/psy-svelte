<script>
    import { onMount } from 'svelte';

    import Countdown from './Countdown.svelte';
    import Blank from './Blank.svelte';
    import MSTTrial from './MSTTrial.svelte';
    import Function from './Function.svelte';
    import { getTrialId } from '../db.js';
    import { wait, waitSec } from './utils.js';

    export let done;
    export let countdownSeconds = 30;
    export let onSeconds = 30;
    export let blockNumber;
    export let beep;
    export let sessionId;

    let trialIdPromise;
    onMount( () => { 
        trialIdPromise = getTrialId(sessionId, blockNumber);
    });

    let promiseHolder = { 'savePromises' : Promise.all([]) };
</script>


{#await waitSec(countdownSeconds) }        
    <Countdown {countdownSeconds} beep={beep} />
{:then countdownDone}
     {#await trialIdPromise}
        <Blank color={"red"} />
     {:then trialId}
        {#await waitSec(onSeconds) }
            <MSTTrial {promiseHolder} {blockNumber} trialId={trialId['id']} />
        {:then timerDoneness}
           {#await promiseHolder['savePromises']}
               <em>saving...</em>
           {:then savesDone}
                <Function func={done} />
           {:catch error}
             <em>
                An error has occurred.
                 Please hit the Esc key to exit the task,
                 and notify study staff.
             </em>
           {/await}
        {/await}
     {:catch error}
        <em> ERROR: {error.message} </em>
     {/await}
{/await}

