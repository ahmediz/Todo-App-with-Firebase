import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskItemComponent } from './tasks-list/task-item/task-item.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AddNewTaskComponent } from './tasks-list/add-new-task/add-new-task.component';
import { TasksService } from './tasks-list/tasks.service';
import { LayoutService } from './layout.service';

const firebaseConfig = {
  apiKey: 'AIzaSyDxzbaOyZwYLzumjz2o5FIjq-IInraXv3w',
  authDomain: 'wss-task.firebaseapp.com',
  databaseURL: 'https://wss-task.firebaseio.com',
  projectId: 'wss-task',
  storageBucket: 'wss-task.appspot.com',
  messagingSenderId: '437314075879',
  appId: '1:437314075879:web:7bf989229c76ed41897642',
};

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskItemComponent,
    AddNewTaskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [TasksService, LayoutService],
  bootstrap: [AppComponent],
})
export class AppModule {}
