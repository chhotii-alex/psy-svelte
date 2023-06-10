<script>
   export let func;

   import { onMount } from 'svelte';

   onMount( () => func() );

</script>
