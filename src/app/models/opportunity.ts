import { Database } from './database'

export class Opportunity {
  protected static database = new Database('opportunities').database

  _id: string
  AccountId: string
  AE_Next_Steps: string
  Amount: number
  Expansion_Amount: number
  First_Year_ACV: number
  First_Year_Amount: number
  Fiscal: string
  Id: string
  IsClosed: boolean
  IsDeleted: boolean
  IsWon: boolean
  Name: string
  SE_Next_Steps: string
  SE_Opportunity_Rating: string
  StageName: string
  Team: Array<TeamMember>

  constructor(object?) {
    if (object) {
      this.AccountId = object.AccountId
      this.AE_Next_Steps = object.AE_Next_Steps
      this.Amount = object.Amount
      this.Expansion_Amount = object.Expansion_Amount
      this.First_Year_ACV = object.First_Year_ACV
      this.First_Year_Amount = object.First_Year_Amount
      this.Fiscal = object.Fiscal
      this.Id = object.Id
      this.IsClosed = object.IsClosed
      this.IsDeleted = object.IsDeleted
      this.IsWon = object.IsWon
      this.Name = object.Name
      this.SE_Next_Steps = object.SE_Next_Steps
      this.SE_Opportunity_Rating = object.SE_Opportunity_Rating
      this.StageName = object.StageName
      this.Team = object.Team
      if (object.AE_Next_Steps__c) {
        this.AE_Next_Steps = object.AE_Next_Steps__c
        this.Expansion_Amount = object.Expansion_Amount__c
        this.First_Year_ACV = object.First_Year_ACV__c
        this.First_Year_Amount = object.First_Year_Amount__c
        this.SE_Next_Steps = object.SE_Next_Steps__c
        this.SE_Opportunity_Rating = object.SE_Opportunity_Rating__c
      }
      if (object.OpportunityTeamMembers) {
        this.Team = object.OpportunityTeamMembers.records.map((record) => { return new TeamMember(record); })
      }
    }

    Opportunity.database.ensureIndex({
      fieldName: 'Id'
    }, function(err) {
      if (err) {
        console.log(err);
      }
    });
    Opportunity.database.ensureIndex({
      fieldName: 'AccountId'
    }, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }

  save(): Promise<any> {
    const self = this;
    return Opportunity.database
      .updateAsync({
        Id: self.Id
      }, self, { upsert: true });
  }

  static getAll(AccountId?): Promise<Array<Opportunity>> {
    let query;

    if (AccountId) {
      query = { 'AccountId': AccountId };
    } else {
      query = {};
    }

    return Opportunity.database.findAsync(query).then((oppies) => {
      if (oppies.length) {
        return oppies.map((o) => {
          return new Opportunity(o)
        })
      } else {
        return []
      }
    })
  }

  static get(Id): Promise<Opportunity> {
    return Opportunity.database.findOneAsync({ Id: Id }).then((oppy) => {
      return new Opportunity(oppy);
    })
  }

  static deleteAll(AccountId): Promise<any> {
    return Opportunity.database.removeAsync({
      AccountId: AccountId
    }, { multi: true });
  }
}

class TeamMember {
  Name: string
  TeamMemberRole: string

  constructor(object) {
    this.Name = object.Name
    this.TeamMemberRole = object.TeamMemberRole
  }
}
