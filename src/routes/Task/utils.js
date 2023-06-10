import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}

export  const range = (start, stop, step) =>
         Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const waitSec = (sec) => wait(sec*1000);

