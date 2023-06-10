<script>
    export let maxDots = 12;
    export let sequence = "41324";
    export let blockNumber;
    export let trialId;
    export let promiseHolder;

    import { onDestroy, tick } from 'svelte';
    import Function from './Function.svelte';
    import { onInterval, range, wait, waitSec } from './utils.js';
    import { sendKeystrokes } from '../db.js';

    let width;
    let height;
    $: dotWidth = (width/maxDots);

    function processKeystrokes() {
        if (newKeys.length) {
          let newPromise = saveKeystrokes(receiptCounter++, newKeys);
          promiseHolder['savePromises'] = Promise.all([promiseHolder['savePromises'], newPromise]);
          newKeys = [];
        }
    }
    onInterval( () => {
        processKeystrokes();
    }, 5000);
    onDestroy( () => {
        processKeystrokes();
        promiseHolder['savePromises'] = Promise.all([promiseHolder['savePromises'], tick()]);
    });

    let newKeys = [];
    let receiptCounter = 1;

    let nDots = 0;
    let direction = 1;
    
    function handleKeydown(event) {
       newKeys.push( { 'key' : event.key, 'timeStamp' : event.timeStamp });
       nDots += direction;
       if (nDots >= maxDots) {
          direction = -1;
       }
       else if (nDots <= 0) {
           direction = 1;
       }
    }

    async function saveKeystrokes(receiptId, keys) {
      if (!keys.length) return receiptId;
      for (let attemptCount = 0; attemptCount < 25; ++attemptCount) {
         console.log(receiptId, attemptCount);
         try {
            let reply = await sendKeystrokes(trialId, receiptId, keys);
            if (reply['receiptId'] == receiptId) {
                return receiptId;
            }
            else {
               throw new Error("Malformed from server: incorrect receiptId");
            }
         }
         catch (error) {
           console.log(error);
         }  // keep trying
         await waitSec(5);  // pause before re-attempt
      }
      // If we got here, no success, even though we tried and tried
      throw new Error("Could not save data.");
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

  <div bind:clientWidth={width} bind:clientHeight={height} >
    {#if dotWidth}
      <svg>
          <text fill="white" x={width/2} y={height/4} text-anchor="middle" >
             {sequence}
          </text>
          {#each range(0, nDots-1, 1) as i}
                <circle
                     cx={(i+0.5)*dotWidth} cy={ height/2 }
                     r={ (dotWidth/2-4) } fill="white" /> 
          {/each}
       </svg>
    {/if}
  </div>

<style>

div {
   height: 100%;
   background-color: green;
   padding: 0px;
}

svg {
   width: 100%;
   height: 100%;
}

text {
  font-family: Arial;
  font-size: 5vw;
}

</style>
