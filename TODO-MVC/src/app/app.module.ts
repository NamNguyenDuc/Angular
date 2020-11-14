import { TodoService } from './services/todo.service';
import { LocalStorageService } from './services/local-storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoInputComponent,
    TodoHeaderComponent,
    TodoFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [LocalStorageService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
