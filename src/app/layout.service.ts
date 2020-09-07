import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  layoutDir = new BehaviorSubject<string>('ltr');
  constructor() {}
}
