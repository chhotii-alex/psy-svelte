<script>
    import OneMSTTrial from './OneMSTTrial.svelte';
    import Repeater from './Repeater.svelte';

    export let done;
    function chunkDone() {
       done();
    }

</script>

<Repeater component={OneMSTTrial} reps='12' done={chunkDone} />

