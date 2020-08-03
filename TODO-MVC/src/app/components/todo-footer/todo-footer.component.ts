import { FilterButton, Filter } from './../../models/filtering.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {
  filterButton: FilterButton[] = [
    { type: Filter.All, label: 'All', isActive: true},
    { type: Filter.Active, label: 'Active', isActive: false},
    { type: Filter.Completed, label: 'Completed', isActive: false},
  ];

  constrfalse() { }

  ngOnInit() {
  }

}
