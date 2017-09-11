import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { PopoverModule } from 'ngx-bootstrap/popover';
import * as moment from 'moment'

import { Todo } from '../../../models'
import { SharedDataService } from '../../../providers'

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class TodolistComponent {

  isAccountPage = false
  accountId: string = null
  public dt: Date;

  @Input()
  set currentAccount(account) {
    this.getAll(account.Id)
    this.isAccountPage = true
    this.accountId = account.Id
  }

  todos: Array<Todo> = [];
  newTodoText = '';

  constructor(private _shared: SharedDataService) {
    this.getAll()
  }

  private getAll(accountId?) {
    Todo.getAll(accountId).then((todos) => {
      this.todos = todos
    })
  }

  formatDate(date: Date) {
    return moment(date).fromNow()
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      const todo = new Todo()
      todo.task = this.newTodoText.trim();
      todo.dueDate = this.dt
      if (this.accountId) {
        todo.AccountId = this.accountId
      }
      todo.save().then((t) => {
        this.todos.push(t)
        this.newTodoText = '';
        this.dt = null
      })
    }
  }

  allCompleted(): boolean {
    return this.todos.length === this.todos.filter((todo: Todo) => todo.completed === true).length
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    todo.save();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.todos.splice(index, 1)
    todo.delete()
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  stopEditing(todo: Todo, editedTitle: string) {
    todo.task = editedTitle;
    todo.editing = false;

  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      return this.remove(todo)
    }

    todo.task = editedTitle;
    todo.save()
  }

  cancelEditingTodo(todo: Todo) {
    todo.editing = false;
  }

  getNbRemaining(): Number {
    return this.todos.filter((todo: Todo) => !!todo.completed === false).length
  }

  getNbComplited(): Number {
    return this.todos.filter((todo: Todo) => !!todo.completed === true).length
  }

  removeCompleted() {
    const t = this.todos.filter((todo: Todo) => !!todo.completed === true)
    t.forEach((todo) => {
      this.remove(todo)
    })
  }

  accountName(id: string): string {
    return this._shared.getAccountName(id)
  }

  setAllTo(completed: boolean) {
    this.todos.forEach((t: Todo) => {
      t.completed = completed
      t.save()
    })
  }
}
