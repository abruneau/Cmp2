import { Injectable } from '@angular/core';
import { Todo } from './todo'
export  { Todo } from './todo'

@Injectable()
export class TodosService {

	constructor() { }

	create(todo?): Todo {
		return new Todo(todo);
	}

	getAll(AccountId?): Promise<any> {
		return Todo.getAll();
	}

	get(id): Promise<any> {
		return Todo.get(id);
	}

}
