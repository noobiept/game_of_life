import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent {
  @ViewChild('canvas') canvas!: HTMLCanvasElement;
  @Input() size = 0;
  @Output() newCanvasEvent = new EventEmitter<HTMLCanvasElement>();

  ngAfterViewInit() {
    this.newCanvasEvent.emit(this.canvas);
  }
}
