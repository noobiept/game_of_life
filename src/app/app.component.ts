import * as createjs from 'createjs-module';
import { Component, ElementRef } from '@angular/core';
import { GameLogic } from './game-logic/game-logic';
import { Square } from './square/square';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    game = new GameLogic({
        size: 20,
        onGridChange: (map) => {
            this.stage.removeAllChildren();

            for (let column = 0; column < this.game.size; column++) {
                for (let line = 0; line < this.game.size; line++) {
                    this.stage.addChild(map[column][line].shape);
                }
            }
        },
    });

    stage!: createjs.Stage;

    updateSize(newSize: number) {
        this.game.updateGridSize(newSize);
    }

    onCanvasChange(canvasRef: HTMLCanvasElement) {
        const canvas = (canvasRef as unknown as ElementRef<HTMLCanvasElement>)
            .nativeElement; // TODO

        this.stage = new createjs.Stage(canvas);
        this.game.initGrid();

        // TODO should clear if already initialized before
        canvas.addEventListener('click', (event) => {
            const x = event.offsetX;
            const y = event.offsetY;

            const column = Math.floor(x / Square.SIZE);
            const line = Math.floor(y / Square.SIZE);

            const square = this.game.map[column][line];

            this.game.onClick(square);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createjs.Ticker.on('tick', this.tick.bind(this) as any);
    }

    startGame() {
        this.game.startGame();
    }

    resetGame() {
        this.game.clearGame();
    }

    tick(event: createjs.TickerEvent) {
        this.game.tick(event);
        this.stage.update();
    }
}
