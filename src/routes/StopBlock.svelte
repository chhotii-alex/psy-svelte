<script>
   export let done;
</script>

<div>
   This is the StopBlock content.
  <button on:click={() => done()}>
    Click to Continue
  </button>
   
</div>

<style>

div {
   background-color: red;
}

</style>
