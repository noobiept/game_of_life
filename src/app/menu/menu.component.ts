import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
    @Input() size = 0
    @Output() newSizeEvent = new EventEmitter<number>()
    @Output() startGameEvent = new EventEmitter<void>()
    @Output() resetGameEvent = new EventEmitter<void>()

    setNewSize(event: Event) {
        const value = (event.target as HTMLInputElement).value
        this.newSizeEvent.emit(parseInt(value, 10))
    }

    startGame() {
        this.startGameEvent.emit()
    }

    resetGame() {
        this.resetGameEvent.emit()
    }
}
