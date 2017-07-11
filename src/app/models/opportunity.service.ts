import { Injectable } from '@angular/core';

import { Opportunity } from './opportunity';
export { Opportunity } from './opportunity';

@Injectable()
export class OpportunityService {

	constructor() { }

	create(oppy?): Opportunity {
		return new Opportunity(oppy);
	}

	getAll(AccountId?): Promise<Array<Opportunity>> {
		return Opportunity.getAll(AccountId);
	}

	get(Id): Promise<Opportunity> {
		return Opportunity.get(Id);
	}

}
