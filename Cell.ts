class Cell {


    private rowNum: number;
    private colNum: number;
    private grid: Array<Array<Cell>>;
    private size: number;
    private visited: boolean;
    private walls: Record<string, boolean>;
    public goal: boolean;

    //Constants
    readonly STROKE_STYLE: string = "#ffffff";
    readonly FILL_STYLE: string = "black";
    readonly LINE_WIDTH: number = 2;

    constructor(rowNum: number, colNum: number, grid: Array<Array<Cell>>, size: number) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.grid = grid;
        this.size = size;
        this.visited = false;
        this.walls = {
            topWall: true,
            rightWall: true,
            bottomWall: true,
            leftWall: true
        }
        this.goal = false;
    }

    public show(size: number, rows: number, columns: number): void {
        let x = (this.colNum * size) / columns;
        let y = (this.rowNum * size) / rows;

        Maze.CTX.strokeStyle = this.STROKE_STYLE;
        Maze.CTX.fillStyle = this.FILL_STYLE;
        Maze.CTX.lineWidth = this.LINE_WIDTH;

        //WE DRAW THE WALLS
        if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
        if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
        if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
        if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);

        //We add color if the cell is visited
        if (this.visited) {
            Maze.CTX.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
        if (this.goal) {
            Maze.CTX.fillStyle = "green";
            Maze.CTX.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
    }

    public checkNeighbours() {
        let grid = this.grid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbours: Array<any> = [];

        //We check if it's the top border of the grid
        let top = row !== 0 ? grid[row - 1][col] : undefined;
        let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
        let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
        let left = col !== 0 ? grid[row][col - 1] : undefined;

        if (top && !top.visited) neighbours.push(top);
        if (right && !right.visited) neighbours.push(right);
        if (bottom && !bottom.visited) neighbours.push(bottom);
        if (left && !left.visited) neighbours.push(left);

        if (neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return undefined;
        }
    }

    /**
     * This function will draw the top wall of the cell
     * @param x int, x coordinate
     * @param y int, y coordinate
     * @param size int, size of grid
     * @param columns int, number of columns
     * @param rows int, number of rows
     */
    private drawTopWall(x: number, y: number, size: number, columns: number, rows: number): void {
        Maze.CTX.beginPath();
        Maze.CTX.moveTo(x, y);
        Maze.CTX.lineTo(x + size / columns, y);
        Maze.CTX.stroke();
    }

    public removeWalls(cell1: Cell, cell2: Cell) {

        //For the x axis
        let x = cell1.colNum - cell2.colNum;
        if (x == 1) {
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        } else if (x == -1) {
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }

        //For the y axis
        let y = cell1.rowNum - cell2.rowNum;
        if (y == 1) {
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        } else if (y == -1) {
            cell1.walls.bottomWall = false;
            cell2.walls.topWall = false;
        }
    }

    public highlight(columns: number, rows: number) {
        let x = (this.colNum * this.size) / columns + 1;
        let y = (this.rowNum * this.size) / rows + 1;

        Maze.CTX.fillStyle = "red";
        Maze.CTX.fillRect(x, y, this.size / columns - 3, this.size / columns - 3)
    }

    /**
     * This function will draw the right wall of the cell
     * @param x int, x coordinate
     * @param y int, y coordinate
     * @param size int, size of grid
     * @param columns int, number of columns
     * @param rows int, number of rows
     */
    private drawRightWall(x: number, y: number, size: number, columns: number, rows: number): void {
        Maze.CTX.beginPath();
        Maze.CTX.moveTo(x + size / columns, y);
        Maze.CTX.lineTo(x + size / columns, y + size / rows);
        Maze.CTX.stroke();
    }

    /**
     * This function will draw the bottom wall of the cell
     * @param x int, x coordinate
     * @param y int, y coordinate
     * @param size int, size of grid
     * @param columns int, number of columns
     * @param rows int, number of rows
     */
    private drawBottomWall(x: number, y: number, size: number, columns: number, rows: number): void {
        Maze.CTX.beginPath();
        Maze.CTX.moveTo(x, y + size / rows);
        Maze.CTX.lineTo(x + size / columns, y + size / rows);
        Maze.CTX.stroke();
    }

    /**
     * This function will draw the left wall of the cell
     * @param x int, x coordinate
     * @param y int, y coordinate
     * @param size int, size of grid
     * @param columns int, number of columns
     * @param rows int, number of rows
     */
    private drawLeftWall(x: number, y: number, size: number, columns: number, rows: number): void {
        Maze.CTX.beginPath();
        Maze.CTX.moveTo(x, y);
        Maze.CTX.lineTo(x, y + size / rows);
        Maze.CTX.stroke();
    }

    /** Setters and getters **/

    public setVisited(isVisited: boolean) {
        this.visited = isVisited;
    }

}