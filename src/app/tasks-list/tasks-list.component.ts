import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask } from './ITask.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, OnDestroy {
  tasks$: Observable<ITask[]>;
  showForm: boolean;
  subs: Subscription[] = [];
  selectedTask: ITask;
  constructor(
    private firestore: AngularFirestore,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.tasksService.selectedTask.subscribe((res) => {
        if (res) {
          this.showForm = true;
          this.selectedTask = res;
        } else {
          this.showForm = false;
          this.selectedTask = null;
        }
      })
    );
    // Getting tasks list
    this.tasks$ = this.firestore
      .collection('tasks')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ITask;
            const id = a.payload.doc.id;
            return { id, ...(data as ITask) };
          })
        )
      );
  }
  addTask(): void {
    this.tasksService.selectedTask.next(null);
    this.showForm = true;
  }

  getDate(): any {
    return new Date();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
