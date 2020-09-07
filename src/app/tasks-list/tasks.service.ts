import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITask } from './ITask.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  selectedTask = new Subject<ITask>();
  constructor() { }
}
