import { Component, Input } from '@angular/core';

import { TodosService, Todo } from '../../../models/todo.service'

@Component({
	selector: 'app-todolist',
	templateUrl: './todolist.component.html',
	styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent {

	@Input() AccountId: string;

	todoService
	todos: Array<Todo> = [];
	newTodoText = '';

	constructor(todoService: TodosService) {
		this.todoService = todoService
		if (this.AccountId) {
			todoService.getAll(this.AccountId).then((todos) => {
				this.todos = todos
			})
		} else {
			todoService.getAll().then((todos) => {
				this.todos = todos
			})
		}
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			const todo = this.todoService.create();
			todo.task = this.newTodoText.trim();
			todo.save().then((t) => {
				this.todos.push(t)
				this.newTodoText = '';
			})
		}
	}

	allCompleted(): Boolean {
		return this.todos.length === this.todos.filter((todo: Todo) => todo.completed === true).length
	}

	toggleCompletion(todo: Todo) {
		todo.completed = !todo.completed;
		todo.save();
	}

	remove(todo: Todo) {
		todo.delete().then(() => {
			const index = this.todos.indexOf(todo)
			this.todos.splice(index)
		}).catch((err) => {
			console.error(err);
		})
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

	// setAll(completed: Boolean) {
	// 	this.todos.forEach((t: Todo) => {
	// 		t.completed = completed
	// 		t.save()
	// 	})
	// }
}
