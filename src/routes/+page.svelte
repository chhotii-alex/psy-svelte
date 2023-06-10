<script>
    import TaskContainer from './TaskContainer.svelte'
    import { validateAccessToken, getSessionId } from './db.js';

    let accessToken = "";
    $: accessTokenLongEnough = (accessToken && accessToken.trim().length >= 3);

    $: validateTokenPromise = validateAccessToken(accessTokenLongEnough, accessToken);

    function initiateTask() {
        taskGoPromise = getSessionId(accessToken);
    }

    let taskGoPromise;

</script>

{#if !taskGoPromise}
   <h1>
       Welcome to the Manoach Lab Task Portal!
   </h1>
   Please enter your access token:
   <input bind:value={accessToken} />
   {#if (accessTokenLongEnough && validateTokenPromise) }
      {#await validateTokenPromise}
         <em>validating...</em>
      {:then isTokenValid}
         {#if isTokenValid}
            <button on:click={initiateTask} >
                Click to start the task!
            </button>
          {:else}
               That is not a valid access token.
           {/if}
       {:catch error}
           <p class="error" >
               Error validating token: {error.message}
           </p>
      {/await}
   {/if}

{:else} <!-- taskGoPromise created -->
    {#await taskGoPromise}
        Waiting for the go-ahead...
    {:then session_info}
        <TaskContainer sessionId={session_info["id"]} />
    {:catch error}
        <p class="error" >
                Glitch! Error code 102. {error.message}
         </p>
    {/await}
{/if}

<!--

* explicitly don't save keystrokes outside green period
* can at least start countdown w/ save promises unresolved
* data lost if Esc?
* exponential back-off
* save data: test with simulation of flaky server connection
* typingWarningLevel
* filter out repeat keystrokes
* output classic spreadsheet format report
* email DM about issues
* code refactoring
* to-do's from old Cat Chu code

-->

