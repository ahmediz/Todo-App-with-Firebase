import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ITask } from '../ITask.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {
  @Input() item: ITask;
  @Input() index: number;

  constructor(
    private firestore: AngularFirestore,
    private tasksService: TasksService,
    ) {}

  ngOnInit(): void {}

  // Setting task to done or reverse
  finishTask(task: ITask): void {
    const newStatus = task.done ? false : true;
    this.firestore
      .collection('tasks')
      .doc(task.id)
      .update({
        ...task,
        done: newStatus,
      });
  }

  edit(): void {
    this.tasksService.selectedTask.next(this.item);
  }
}
