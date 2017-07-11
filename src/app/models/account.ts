import { Database } from './database';
import { Opportunity } from './opportunity';

export class Account {
	protected static database = new Database('accounts').database

	_id: string;
	Id: string;
	Name: string;
	Industry: string;
	IsPartner: Boolean;
	Type: string;
	Full_Address__c: string;
	CurrencyIsoCode: string;
	AnnualRevenue: Number;
	Stared = false;
	path: string;

	constructor(object?) {
		if (object) {
			this._id = object._id;
			this.Id = object.Id;
			this.Name = object.Name;
			this.Industry = object.Industry;
			this.IsPartner = object.IsPartner;
			this.Type = object.Type;
			this.Full_Address__c = object.Full_Address__c;
			this.CurrencyIsoCode = object.CurrencyIsoCode;
			this.AnnualRevenue = object.AnnualRevenue;
			this.Stared = object.Stared || false;
			this.path = object.path;
		}
		Account.database.ensureIndex({
			fieldName: 'Id'
		}, function(err) {
			if (err) {
				console.log(err);
			}
		});
	}

	save(): Promise<any> {
		const self = this
		if (self._id) {
			return Account.database.updateAsync({
				_id: self._id
			}, self, {});
		} else {
			return Account.database.insertAsync(self).then(function(newDoc) {
				self._id = newDoc._id;
				return self;
			});
		}
	}

	update(object) {
		if (object.Id) {
			this.Id = object.Id
		}
		if (object.Name) {
			this.Name = object.Name
		}
		if (object.Industry) {
			this.Industry = object.Industry
		}
		if (object.IsPartner) {
			this.IsPartner = object.IsPartner
		}
		if (object.Type) {
			this.Type = object.Type
		}
		if (object.Full_Address__c) {
			this.Full_Address__c = object.Full_Address__c
		}
		if (object.CurrencyIsoCode) {
			this.CurrencyIsoCode = object.CurrencyIsoCode
		}
		if (object.AnnualRevenue) {
			this.AnnualRevenue = object.AnnualRevenue
		}
		if (object.Stared) {
			this.Stared = object.Stared
		}
		if (object.path) {
			this.path = object.path
		}
	}

	delete(): Promise<any> {
		const self = this
		return Account.database.removeAsync({
			_id: this._id
		}, {}).then(() => {
			return Opportunity.deleteAll(self.Id)
		});
	}

	static get(id): Promise<any> {
		return Account.database.findOneAsync({ Id: id }).then((account) => {
			return new Account(account);
		})
	}

	static getList(): Promise<any> {
		return Account.database.findAsync({}, { Name: 1, Id: 1 })
	}

}
