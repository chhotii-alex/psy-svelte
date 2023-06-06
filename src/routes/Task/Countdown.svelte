<script>
    export let sequence = "41324";
    export let countdownSeconds = 30;
    export let done;
    export let beep;

    import { onInterval } from './utils.js';

    let numberWords = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
        "twenty",
        "twenty-one",
        "twenty-two",
        "twenty-three",
        "twenty-four",
        "twenty-five",
        "twenty-six",
        "twenty-seven",
        "twenty-eight",
        "twenty-nine",
        "thirty"
   ];

    let width;
    let height;

    let countdownSecondsRemaining = countdownSeconds;
    let startWhen = new Date();
    onInterval( () => {
         if (countdownSecondsRemaining > 0) {
           countdownSecondsRemaining--;
           if (countdownSecondsRemaining < 3) {
              beep.play();
           }
        }
        else {
           done();
        }
         
     }, 1000);

</script>

<div bind:clientWidth={width} bind:clientHeight={height} >
  {#if width }
    <svg>
      <text fill="white" x={width/2} y={height/4} text-anchor="middle" >
         {sequence}
      </text>
      {#if countdownSecondsRemaining >= 3}
         <text fill="white" x={width/2} y={height/2} text-anchor="middle" >
           {numberWords[countdownSecondsRemaining]}
         </text>
      {/if}
    </svg>
  {/if}
</div>

<style>

div {
   height: 100%;
   background-color: red;
   color: white;
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
