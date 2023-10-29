import * as createjs from 'createjs-module';

export type SquareArgs = {
    column: number;
    line: number;
};

export class Square {
    shape: createjs.Shape;
    isAlive = false;
    column: number;
    line: number;

    static readonly SIZE = 20; // pixel size of a square

    constructor({ column, line }: SquareArgs) {
        const shape = new createjs.Shape();

        this.shape = shape;
        this.column = column;
        this.line = line;
        this.shape.on('click', () => {
            this.setAlive(!this.isAlive);
        });
        this.setAlive(false);
        this.setPosition(column, line);
    }

    setPosition(column: number, line: number) {
        this.shape.x = column * Square.SIZE;
        this.shape.y = line * Square.SIZE;
    }

    setAlive(yes: boolean) {
        const g = this.shape.graphics;

        g.clear();

        if (yes) {
            g.beginFill('black');

            this.isAlive = true;
        } else {
            g.beginFill('rgb(243, 243, 243)');

            this.isAlive = false;
        }

        g.drawRoundRect(0, 0, Square.SIZE, Square.SIZE, 5);
    }

    remove() {
        // TODO
        // G.STAGE.removeChild(this.shape);
    }
}
