import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}

export  const range = (start, stop, step) =>
         Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
