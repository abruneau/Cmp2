import { Database } from './database'

export class Todo {
  protected static database = new Database('todos').database

  _id: string;
  task: string;
  dueDate: Date;
  AccountId: string;
  completed: boolean;
  editing = false;

  static getAll(AccountId?): Promise<any> {
    let query;

    if (AccountId) {
      query = { 'AccountId': AccountId };
    } else {
      query = {};
    }

    return Todo.database.findAsync(query).then((todos) => {
      if (todos.length) {
        return todos.map((t) => {
          return new Todo(t)
        })
      } else {
        return []
      }
    })
  }

  static get(id): Promise<any> {
    return Todo.database.findOneAsync({ _id: id }).then((todo) => {
      return new Todo(todo);
    })
  }

  constructor(object?) {
    if (object) {
      this._id = object._id
      this.task = object.task
      this.dueDate = object.dueDate
      this.AccountId = object.AccountId
      this.completed = object.completed
    }
  }

  save(): Promise<any> {
    const self = this
    if (self._id) {
      return Todo.database.updateAsync({
        _id: self._id
      }, self, {});
    } else {
      return Todo.database.insertAsync(self).then(function(newDoc) {
        self._id = newDoc._id;
        return self;
      });
    }
  }

  delete(): Promise<any> {
    return Todo.database.removeAsync({
      _id: this._id
    }, {});
  }

}
