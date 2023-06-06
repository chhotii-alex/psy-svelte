<script>
    export let seconds = 30;
    export let done;
    export let maxDots = 12;
    export let sequence = "41324";
    export let blockNumber;

    import { onInterval, range } from './utils.js';

    let width;
    let height;
    $: dotWidth = (width/maxDots);

    let startWhen = new Date();
    onInterval( () => {
        let now = new Date();
        let diff = (now.getTime() - startWhen.getTime())/1000;
        if (diff >= seconds) {
           done();
        }
     }, 1000);

    let nDots = 0;
    let direction = 1;
    
    function handleKeydown(event) {
       console.log(nDots);
       nDots += direction;
       if (nDots >= maxDots) {
          direction = -1;
       }
       else if (nDots <= 0) {
           direction = 1;
       }
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
      <circle cx={(i+0.5)*dotWidth} cy={ height/2 } r={ (dotWidth/2-4) } fill="white" /> 
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
