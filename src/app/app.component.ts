import * as createjs from 'createjs-module'
import { Component, ElementRef } from '@angular/core'
import { Square } from './square/square'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'game_of_life'
    size = 20
    map: Square[][] = []
    stage!: createjs.Stage

    updateSize(newSize: number) {
        this.size = newSize
    }

    initGrid() {
        const size = this.size
        for (let column = 0; column < size; column++) {
            this.map[column] = []
            for (let line = 0; line < size; line++) {
                const square = new Square({ column, line })
                this.map[column][line] = square

                this.stage.addChild(square.shape)
            }
        }
    }

    onCanvasChange(canvasRef: HTMLCanvasElement) {
        const canvas = (canvasRef as unknown as ElementRef<HTMLCanvasElement>)
            .nativeElement // TODO

        this.stage = new createjs.Stage(canvas)
        this.initGrid()

        // TODO should clear if already initialized before
        createjs.Ticker.on('tick', this.tick.bind(this))
    }

    tick() {
        this.stage.update()
    }
}
