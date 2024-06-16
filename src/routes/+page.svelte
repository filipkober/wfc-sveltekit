<script lang="ts">
	import { onMount } from "svelte";
    import { GridCanvas } from "$lib/canvasUtils"
    import { shortRgbToLong } from '$lib/colors'

    let canvas: HTMLCanvasElement;
    let canvasControls: HTMLDivElement;
    let clearButton: HTMLButtonElement;
    let canvasColor: string = "#00ff00"

    const CELL_SIZE  = 40;
    const rows = 10
    const CANVAS_WIDTH = 800
    const CANVAS_HEIGHT = 800

    onMount(() => {
        const context = canvas.getContext("2d");
        canvasControls.style.width = `${CANVAS_WIDTH}px`

        const {width, height, top, left} = canvas.getBoundingClientRect();

        if (context !== null) {
            const grid = new GridCanvas(context, width, height, CELL_SIZE) 

            clearButton.onclick = () => grid.clear();

            canvas.addEventListener("mousedown", (e) => {
                const x = e.clientX - left;
                const y = e.clientY - top;
                const cellCoords = grid.canvasToCellCoordinates({x, y})
                grid.fillCell(cellCoords.x, cellCoords.y, shortRgbToLong(canvasColor))

            })
        }
    })

</script>

<main class="w-screen h-screen flex flex-col items-center">
    <h1 class="text-center mx-auto p-8 text-2xl">wave function collapse</h1>

    <canvas class="border-2 border-black" bind:this={canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>

    </canvas>

    <div bind:this={canvasControls} class="mt-4 bg-gray-300 flex gap-4 border-2 border-black p-4">
        <button class="px-8 py-2 bg-gray-200 hover:bg-red-500 hover:text-white rounded-md" bind:this={clearButton}>CLEAR</button>
        <input type="color" bind:value={canvasColor} class="my-auto"/>
    </div>

</main>

<style lang="postcss">
    main {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>

