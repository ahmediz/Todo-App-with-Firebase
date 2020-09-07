import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wss-task';
  layoutDir$: Observable<string>;
  constructor(public layout: LayoutService) {
    this.layoutDir$ = this.layout.layoutDir.pipe(map((dir) => dir));
  }
}
