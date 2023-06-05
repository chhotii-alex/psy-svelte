<script>
   export let done;
</script>

<div>
  <p>
    Here, have some instructions...
  </p>
  <nl>
    <li>
      foo
    </li>
    <li>
      bar
    </li>
    <li>
      baz
    </li>
  <nl>
  <button on:click={() => done()}>
    Click to Continue
  </button>
   
</div>

<style>

div {
   border: 2px;
}

</style>
