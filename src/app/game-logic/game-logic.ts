import { Square } from '../square/square';

export type GameLogicArgs = {
    size: number;
    onGridChange: (map: Square[][]) => void;
};

export class GameLogic {
    size: number;
    countTime = 0;
    updateTime = 300;
    map: Square[][] = [];
    private initPhase = true;
    onGridChange: (map: Square[][]) => void;

    constructor({ size, onGridChange }: GameLogicArgs) {
        this.size = size;
        this.onGridChange = onGridChange;
    }

    initGrid() {
        const size = this.size;
        for (let column = 0; column < size; column++) {
            this.map[column] = [];
            for (let line = 0; line < size; line++) {
                const square = new Square({ column, line });
                this.map[column][line] = square;
            }
        }

        this.onGridChange(this.map);
    }

    updateGridSize(newSize: number) {
        this.clearGame();

        this.map.length = 0;

        // init. the map with the new size
        this.size = newSize;

        this.initGrid();
    }

    startGame() {
        this.initPhase = false;
        this.updateGame();
    }

    updateGame() {
        const change = [];
        const size = this.size;

        for (let column = 0; column < size; column++) {
            for (let line = 0; line < size; line++) {
                const square = this.map[column][line];

                const howMany = this.howManyAliveNeighbors(square);

                if (square.isAlive) {
                    if (howMany <= 1 || howMany >= 4) {
                        change.push({ square: square, setAlive: false });
                    }
                } else {
                    if (howMany === 3) {
                        change.push({ square: square, setAlive: true });
                    }
                }
            }
        }

        for (let a = 0; a < change.length; a++) {
            change[a].square.setAlive(change[a].setAlive);
        }
    }

    clearGame() {
        this.initPhase = true;

        const size = this.size;
        for (let column = 0; column < size; column++) {
            for (let line = 0; line < size; line++) {
                const square = this.map[column][line];

                square.setAlive(false);
            }
        }
    }

    isRunning() {
        return !this.initPhase;
    }

    onClick(square: Square) {
        if (!this.initPhase) {
            return;
        }

        square.setAlive(!square.isAlive);
    }

    howManyAliveNeighbors(square: Square) {
        const size = this.size;
        let howMany = 0;
        let startColumn = square.column - 1;

        if (startColumn < 0) {
            startColumn = 0;
        }

        let startLine = square.line - 1;

        if (startLine < 0) {
            startLine = 0;
        }

        let endColumn = square.column + 1;

        if (endColumn > size - 1) {
            endColumn = square.column;
        }

        let endLine = square.line + 1;

        if (endLine > size - 1) {
            endLine = square.line;
        }

        for (let column = startColumn; column <= endColumn; column++) {
            for (let line = startLine; line <= endLine; line++) {
                const otherSquare = this.map[column][line];

                if (otherSquare !== square) {
                    if (this.map[column][line].isAlive) {
                        howMany++;
                    }
                }
            }
        }

        return howMany;
    }

    tick(event: createjs.TickerEvent) {
        if (this.initPhase) {
            return;
        }

        this.countTime += event.delta;

        if (this.countTime > this.updateTime) {
            this.countTime = 0;

            this.updateGame();
        }
    }
}
