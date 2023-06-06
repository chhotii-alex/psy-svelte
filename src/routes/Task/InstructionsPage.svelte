<script>
    export let requiredKeyPattern = "1";
    export let minMilliseconds = 1000;
    export let done;

    import { onInterval } from './utils.js';

    $: startWhen = setStart(requiredKeyPattern);

    function setStart(anyChangedVariable) {
       hasMinTimeElapsed = false;
       return new Date();
    }

    let tickTock = 0;

    onInterval( () => tickTock++, minMilliseconds);

    function minTimeElapsed(anyUpdatedVarable) {
       let now = new Date();
       let diff = now.getTime() - startWhen.getTime();
       return (diff >= minMilliseconds);
    }

    $: hasMinTimeElapsed = minTimeElapsed(tickTock);

    function handleKeydown(event) {
       if (event.key == requiredKeyPattern) {
          if (hasMinTimeElapsed) {
             done();
          }
       }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div>
  <slot>
  </slot>
     {#if hasMinTimeElapsed}
       <p class="bottom" > 
          Press {requiredKeyPattern} to continue.
       </p>
     {/if}
</div>

<style>

div {
   font-family: Arial;
   font-size: 3vw;
   height: 100%;
   background-color: black;
   color: white;
   padding: 45px;
}

.bottom {
   position: fixed;
   bottom: 100px;
}

</style>
