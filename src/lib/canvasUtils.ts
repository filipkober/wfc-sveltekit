
export type Coordinates = {
    x: number,
    y: number
}
export type StrokeStyle = {
    style: string,
    lineWidth: number
}

export const drawLine = (ctx: CanvasRenderingContext2D, start: Coordinates, end: Coordinates, style: StrokeStyle = {style: "black", lineWidth: 1}) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = style.style;
    ctx.lineWidth = style.lineWidth;
    ctx.stroke();
}

export const drawGrid = (ctx: CanvasRenderingContext2D, cWidth: number, cHeight: number, cellSize: number) => {
    for(let x = cellSize; x < cWidth; x += cellSize) {
        drawLine(ctx, {x, y: 0}, {x, y: cHeight})
    }
    for(let y = cellSize; y < cHeight; y += cellSize) {
        drawLine(ctx, {x: 0, y}, {x: cWidth, y})
    }
}

export class GridCanvas {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    cellSize: number;
    rows: number; 
    cols: number;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, cellSize: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        
        this.rows = Math.floor(this.width / this.cellSize)
        this.cols = Math.floor(this.height / this.cellSize)

        drawGrid(ctx, width, height, cellSize);
    };

    fillCell(column: number, row: number, color: string = "green") {
        const y = row * this.cellSize;
        const x = column * this.cellSize;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize)
    }

    canvasToCellCoordinates(c: Coordinates): Coordinates {
        if(c.x > this.width || c.y > this.height) {
            throw new Error("Coordinates out of bound")
        }

        return {x: Math.floor(c.x / this.cellSize), y: Math.floor(c.y / this.cellSize)}
    }

    mouseDown(e: MouseEvent) {

    }

    clear() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0,0,this.width,this.height);
        drawGrid(this.ctx, this.width, this.height, this.cellSize);
    }
}