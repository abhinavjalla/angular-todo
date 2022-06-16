import { Component, OnInit } from '@angular/core';
import { ToDo } from './interfaces/ToDo';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  toDoList: ToDo[] = [];
  newTask: string = '';
  editIndex: number;
  today = new Date();
  headers = ['Task', 'Created'];

  ngOnInit() {
    this.toDoList = JSON.parse(localStorage.getItem('toDoItems')) || [];
  }
  addTask() {
    if (this.newTask !== '') {
      this.toDoList.push({
        Task: this.newTask,
        Created: this.today.toISOString().split('T')[0],
        status: 'todo',
      });
      this.newTask = '';
      this.setLocalStorage();
    }
  }
  clearToDo() {
    this.toDoList = [];
    localStorage.removeItem('toDoItems');
  }
  editItem(index: number) {
    this.editIndex = index;
  }
  updateTask() {
    this.editIndex = undefined;
    this.setLocalStorage();
  }
  editToDo(index: number) {
    return this.editIndex == index ? true : false;
  }
  completeTask(index: number) {
    this.toDoList[index].status = 'completed';
    this.setLocalStorage();
  }
  setLocalStorage() {
    localStorage.removeItem('toDoItems');
    localStorage.setItem('toDoItems', JSON.stringify(this.toDoList));
  }
  completedList() {
    return this.toDoList.filter((item: ToDo) => item.status === 'completed');
  }
}
