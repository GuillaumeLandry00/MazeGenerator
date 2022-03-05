var Maze = /** @class */ (function () {
    function Maze(size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
    }
    /**
     * This function setup the canvas with the number of rows and columns received in the constructor
     */
    Maze.prototype.setUpCanvas = function () {
        for (var r = 0; r < this.rows; r++) {
            var row = [];
            for (var c = 0; c < this.columns; c++) {
                var cell = new Cell(r, c, this.grid, this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        this.current = this.grid[0][0];
    };
    Maze.prototype.draw = function () {
        var _this = this;
        Maze.MAZE_CANVAS.width = this.size;
        Maze.MAZE_CANVAS.height = this.size;
        Maze.MAZE_CANVAS.style.background = "black";
        this.current.setVisited(true);
        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.columns; c++) {
                var grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }
        var next = this.current.checkNeighbours();
        if (next) {
            next.visited = true;
            this.stack.push(this.current);
            this.current.highlight(this.columns, this.rows);
            this.current.removeWalls(this.current, next);
            this.current = next;
        }
        else if (this.stack.length > 0) {
            var cell = this.stack.pop();
            this.current = cell;
            this.current.highlight(this.columns, this.rows);
        }
        if (this.stack.length == 0) {
            return;
        }
        if (this.current == this.grid[this.rows - 1][this.columns - 1])
            this.current.goal = true;
        window.requestAnimationFrame(function () {
            _this.draw();
        });
    };
    var _a;
    _a = Maze;
    Maze.MAZE_CANVAS = document.querySelector(".maze");
    Maze.CTX = _a.MAZE_CANVAS.getContext("2d");
    return Maze;
}());
var newMaze = new Maze(500, 10, 10);
newMaze.setUpCanvas();

