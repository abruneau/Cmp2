import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx'

import { Account } from './account';
export { Account } from './account';

@Injectable()
export class AccountService {

	public List = new BehaviorSubject([]);

	constructor() {
		Account.getList().then((accounts) => {
			this.List.next(accounts);
		})
	}

	create(account?): Account {
		return new Account(account);
	}

	get(id): Promise<any> {
		return Account.get(id);
	}

	notifyChanges() {
		Account.getList().then((accounts) => {
			this.List.next(accounts);
		})
	}

}
