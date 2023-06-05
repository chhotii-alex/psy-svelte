<script>
    export let done;
    export let seconds = 300;

    import { onInterval, range } from './utils.js';

    let width;
    let height;

    let startWhen = new Date();
    onInterval( () => {
        let now = new Date();
        let diff = (now.getTime() - startWhen.getTime())/1000;
        if (diff >= seconds) {
           done();
        }
     }, 1000);

</script>

<div bind:clientWidth={width} bind:clientHeight={height} >

{#if width}
  <svg>
    <text fill="yellow" x={width/2} y={height/2} >
       Thank you!
    </text>
    <text fill="yellow" x={width/2} y={height/4} >
       Hit the Escape key to exit.
    </text>
  </svg>
{/if}

</div>

<style>

div {
   font: 20px Arial;
   width: 100%;
   height: 100%;
   background-color: black;
   padding: 0px;
}

text {
  font-family: Arial;
}

svg {
   width: 100%;
   height: 100%;
}

</style>
