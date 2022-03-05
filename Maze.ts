class Maze {
    static readonly MAZE_CANVAS: HTMLCanvasElement = document.querySelector(".maze");
    static readonly CTX: CanvasRenderingContext2D = this.MAZE_CANVAS.getContext("2d");

    private size: number;
    private rows: number;
    private columns: number;
    private grid: Array<Array<Cell>>;
    private stack: Array<any>;
    public current: Cell;

    constructor(size: number, rows: number, columns: number) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
    }

    /**
     * This function setup the canvas with the number of rows and columns received in the constructor
     */
    public setUpCanvas(): void {
        for (let r = 0; r < this.rows; r++) {
            let row: Array<Cell> = [];
            for (let c = 0; c < this.columns; c++) {
                let cell: Cell = new Cell(r, c, this.grid, this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        this.current = this.grid[0][0];

    }

    public draw() {
        Maze.MAZE_CANVAS.width = this.size;
        Maze.MAZE_CANVAS.height = this.size;
        Maze.MAZE_CANVAS.style.background = "black";
        this.current.setVisited(true);

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }

        let next = this.current.checkNeighbours();

        if (next) {
            next.visited = true;
            this.stack.push(this.current);
            this.current.highlight(this.columns, this.rows);
            this.current.removeWalls(this.current, next);
            this.current = next;
        } else if (this.stack.length > 0) {
            let cell = this.stack.pop();
            this.current = cell;
            this.current.highlight(this.columns, this.rows);
        }

        if (this.stack.length == 0) {
            return
        }

        if (this.current == this.grid[this.rows - 1][this.columns - 1]) this.current.goal = true;

        window.requestAnimationFrame(() => {
            this.draw();
        })
    }
}

let newMaze: Maze = new Maze(500, 50, 50);
newMaze.setUpCanvas();
newMaze.draw();
