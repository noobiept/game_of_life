import * as createjs from 'createjs-module';
import { Component, ElementRef } from '@angular/core';
import { GameLogic } from './game-logic/game-logic';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'game_of_life';
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
