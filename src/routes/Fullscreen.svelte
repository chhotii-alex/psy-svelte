<script>
  /*
    Credit goes to Ilia Mikhailov for the inspiration for
    this beautifully simple and useful component.
    See https://codechips.me/lets-build-a-svelte-fullscreen-component/
    Modified in some respects:
    * Svelte now does not allow document to be referenced in outermost context
    * Removed icon
    * slots for different content depending on capabilities and state
    * value of isFull remains valid after using Esc to end full-screen
  */

  import { onMount } from "svelte";

  // define initial component state
  let isFull = false;
  let fsContainer = null;

  // boring plain js fullscreen support stuff below
  const noop = () => {};

  function isFullscreen(doc) {
     return ((doc.fullScreen) || (doc.mozFullScreen)
         || (doc.webkitIsFullScreen) || (doc.msFullScreenElement)
         || (doc.msFullscreenElement));
  }

  function gotFullScreenMethod(event) {
     if (isFullscreen(document)) {
       isFull = true;
     }
     else {
       isFull = false;
     }
  }

  let fullscreenSupport;
  function detectFullScreenSupport(doc) {
     if (doc.addEventListener) {
        doc.addEventListener("fullscreenchange", gotFullScreenMethod);
        doc.addEventListener("mozfullscreenchange", gotFullScreenMethod);
        doc.addEventListener("webkitfullscreenchange", gotFullScreenMethod);
        doc.addEventListener("msfullscreenchange", gotFullScreenMethod);
        doc.addEventListener("MSFullscreenChange", gotFullScreenMethod);
      }
      else {
         doc.attachEvent("fullscreenchange", gotFullScreenMethod);
      }
      return !!(
       doc.fullscreenEnabled ||
       doc.webkitFullscreenEnabled ||
       doc.mozFullScreenEnabled ||
       doc.msFullscreenEnabled ||
       false
     );
  }

  let exitFullscreen;
  function getExitFullscreen(doc) {
    return (doc.exitFullscreen ||
     doc.mozCancelFullScreen ||
     doc.webkitExitFullscreen ||
     doc.msExitFullscreen ||
     noop
    ).bind(doc);
  }

  const requestFullscreen = () => {
    const requestFS = (
      fsContainer.requestFullscreen ||
      fsContainer.mozRequestFullScreen ||
      fsContainer.webkitRequestFullscreen ||
      fsContainer.msRequestFullscreen ||
      noop
    ).bind(fsContainer);
    requestFS();
  };

  onMount(() => {
    fullscreenSupport = detectFullScreenSupport(document);
    exitFullscreen = getExitFullscreen(document);
  });

  // handler for the fullscreen button
  const fsToggle = () => {
    if (!fullscreenSupport) return;

    if (isFull) {
      exitFullscreen();
    } else {
      requestFullscreen(fsContainer);
    }
  };
</script>

<div class="fs" class:isFull bind:this={fsContainer}>
  <slot {isFull} {fsToggle} {exitFullscreen} {requestFullscreen} />
  {#if fullscreenSupport}
      {#if isFull}
          <slot name="already_fullscreen" />
      {:else}
          <slot name="if_fullscreen_support"  />
      {/if}
  {:else}
      <slot name="no_fullscreen_support" />
  {/if}
</div>

<style>
  .isFull {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
  }
</style>

