import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'game_of_life';
  size = 20;

  updateSize(newSize: number) {
    this.size = newSize;
  }
}
