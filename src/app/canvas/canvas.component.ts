import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core'

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas') canvas!: HTMLCanvasElement
    @Input() size = 0
    @Output() newCanvasEvent = new EventEmitter<HTMLCanvasElement>()

    ngAfterViewInit() {
        this.newCanvasEvent.emit(this.canvas)
    }
}
