<script>
    export let sequence = "41324";
    export let countdownSeconds = 30;
    export let done;

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
        }
        else {
           done();
        }
         
     }, 1000);

</script>

<div bind:clientWidth={width} bind:clientHeight={height} >
  {#if width }
    <svg>
      <text fill="white" x={width/2} y={height/4} >
         {sequence}
      </text>
      {#if countdownSecondsRemaining > 0}
         <text fill="white" x={width/2} y={height/2} >
           {numberWords[countdownSecondsRemaining]}
         </text>
      {/if}
    </svg>
  {/if}
</div>

<style>

div {
   width: 100%;
   height: 100%;
   background-color: red;
   color: white;
   padding: 45px;
}

svg {
  width: 100%;
  height: 100%;
}

text {
  font-family: Arial;
}

</style>
