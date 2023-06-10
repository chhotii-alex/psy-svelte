<script>

    import Fullscreen from './Fullscreen.svelte';
    import MSTTask from './Task/MSTTask.svelte';

    export let sessionId;

</script>

<Fullscreen let:isFull={isFull} let:requestFullscreen={requestFullscreen}
    let:exitFullscreen={exitFullscreen} >
  <p slot="if_fullscreen_support" >
       <button on:click={requestFullscreen}>
           Click to full-screen
       </button>
   </p>
   <div slot="already_fullscreen" >
   </div>
   <h1 slot="no_fullscreen_support" >
      I'm sorry, you cannot use this browser for the task.
   </h1>
   <MSTTask running={isFull} done={exitFullscreen} sessionId={sessionId} />
</Fullscreen>

<style>

div {
    width: 100vw;
    height: 100vh;
}

</style>
