import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  todoContent: string = '';

  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    if(this.todoContent.trim() === ''){
      return false;
    }

    console.log(this.todoContent)
  }

}
