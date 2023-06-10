<script>
    export let running = true;
    export let done;
    export let handedness = "left";
    export let sequence = "41324";
    export let onTime = 30;
    export let offTime = 30;
    export let blockCount = 12;
    export let sessionId;

    import InstructionsPage from './InstructionsPage.svelte';
    import Blank from './Blank.svelte';
    import MSTBlock from './MSTBlock.svelte';
    import ThanksBye from './ThanksBye.svelte';
    import { range } from './utils.js';
    import { setTimestamp } from '../db.js';

    let beep;

    let savePromise;
    let instructionsPagesDone = 0;
    function instructionsPageDone(timestamp) {
       instructionsPagesDone++;
       if (instructionsPagesDone == 3) {
         // This returns a Promise. It's async.
         savePromise = setTimestamp(sessionId, timestamp);
       }
    }

    $: countdownSeconds = (currentBlock>1)?30:10;

    let currentBlock = 1;
    function blockDone() {
       ++currentBlock;
    }

    function taskDone() {
      done();
    }

    function isTaskStarted(instructionsPagesDone) {
       return (instructionsPagesDone > 0);
    }

    function isEnoughTaskDone(currentBlock) {
       return (currentBlock >= blockCount);
    }

    $: isMidTask = isTaskStarted(instructionsPagesDone) && !isEnoughTaskDone(currentBlock);

</script>

<audio src='beep.mp3' id='mstbeep' preload='auto' bind:this={beep} />

{#if running}
 {#if instructionsPagesDone < 3}
  <InstructionsPage done={instructionsPageDone} minMilliseconds={1000}
           requiredKeyPattern={instructionsPagesDone+1}>
     <p>
        Place the fingers of your {handedness} hand on the 1, 2, 3, and 4 keys
        at the top of your keyboard.
     </p>
     {#if instructionsPagesDone > 0}
         <p>
             You will be shown a string of {sequence.length} digits, {sequence}, and the
             computer will start counting down until you start.
             Once the countdown has completed and the screen turns green,
             type {sequence} over and over as quickly and accurately as possible.
             You will have {onTime} seconds to type {sequence} as many times as possible.
         </p>
         {#if instructionsPagesDone > 1} 
             <p> 
                 Stop when the screen turns red again.
                 You will get {offTime} seconds to rest before the next trial.
                 There will be {blockCount} trials in all.
             </p>
         {/if}
     {/if}
  </InstructionsPage>
  {:else if (currentBlock <= blockCount)}
    {#await savePromise}
       <Blank color="red" />
    {:then saveDone}
        {#each range(1, blockCount, 1) as blockIndex}
            {#if (blockIndex == currentBlock)}
               <MSTBlock countdownSeconds={countdownSeconds} done={blockDone}
                  sessionId={sessionId}
                  blockNumber={currentBlock} beep={beep} />
            {/if}
        {/each}
    {:catch error}
       <em>An error occurred.
       Please exit the task by hitting the Esc key,
       and notify study staff.
       </em>
    {/await}
 {:else}
   <ThanksBye done={taskDone} />
 {/if}
{:else}
  {#if isMidTask }
    <em>task paused</em>
  {/if}
{/if}

<style>



</style>
