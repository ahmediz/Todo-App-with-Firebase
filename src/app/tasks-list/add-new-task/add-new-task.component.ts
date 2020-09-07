import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ITask } from '../ITask.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewTaskComponent implements OnInit, OnChanges {
  taskTitle: string;
  @Input() selectedTask: ITask;

  constructor(
    private firestore: AngularFirestore,
    public tasksService: TasksService,
    public changeRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.selectedTask.currentValue) {
      this.taskTitle = changes.selectedTask.currentValue.title;
    } else {
      this.taskTitle = '';
    }
  }

  // Adding New Task
  addNewTask(): void {
    if (this.selectedTask) {
      const newTask = {
        title: this.taskTitle,
        done: this.selectedTask.done,
      };
      this.firestore
        .collection('tasks')
        .doc(this.selectedTask.id)
        .update(newTask)
        .then(() => {
          this.tasksService.selectedTask.next(null);
        });
    } else {
      const item = {
        done: false,
        title: this.taskTitle,
      };
      this.firestore
        .collection('tasks')
        .add(item)
        .then(() => {
          this.taskTitle = '';
          this.changeRef.detectChanges();
        });
    }
  }
}
