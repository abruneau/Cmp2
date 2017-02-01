'use strict';

/**
 * @memberof cmp2App
 * @ngdoc service
 * @name SOQL
 * @description
 * # SOQL
 * Factory in the cmp2App.
 */
angular.module('cmp2App').factory('SOQL', function() {
  var self = this;

  // var accountFields = ['Id', 'IsDeleted', 'MasterRecordId', 'Name', 'Type', 'RecordTypeId', 'ParentId', 'BillingStreet', 'BillingCity', 'BillingState', 'BillingPostalCode', 'BillingCountry', 'BillingLatitude', 'BillingLongitude', 'BillingGeocodeAccuracy', 'BillingAddress', 'ShippingStreet', 'ShippingCity', 'ShippingState', 'ShippingPostalCode', 'ShippingCountry', 'ShippingLatitude', 'ShippingLongitude', 'ShippingGeocodeAccuracy', 'ShippingAddress', 'Phone', 'Fax', 'Website', 'PhotoUrl', 'Sic', 'Industry', 'AnnualRevenue', 'NumberOfEmployees', 'Ownership', 'TickerSymbol', 'Description', 'Site', 'CurrencyIsoCode', 'OwnerId', 'CreatedDate', 'CreatedById', 'LastModifiedDate', 'LastModifiedById', 'SystemModstamp', 'LastActivityDate', 'LastViewedDate', 'LastReferencedDate', 'IsPartner', 'IsCustomerPortal', 'JigsawCompanyId', 'CleanStatus', 'AccountSource', 'DunsNumber', 'Tradestyle', 'NaicsCode', 'NaicsDesc', 'YearStarted', 'SicDesc'];
  // var opportunityFields = ['Id', 'IsDeleted', 'AccountId', 'RecordTypeId', 'Name', 'Description', 'StageName', 'Amount', 'CloseDate', 'Type', 'LeadSource', 'IsClosed', 'IsWon', 'ForecastCategory', 'ForecastCategoryName', 'CurrencyIsoCode', 'CampaignId', 'HasOpportunityLineItem', 'IsSplit', 'OwnerId', 'CreatedDate', 'CreatedById', 'LastModifiedDate', 'LastModifiedById', 'SystemModstamp', 'LastActivityDate', 'FiscalQuarter', 'FiscalYear', 'Fiscal', 'LastViewedDate', 'LastReferencedDate', 'SyncedQuoteId', 'HasOpenActivity', 'HasOverdueTask', 'Sugar_Account_ID__c', 'Sugar_Contact_ID__c', 'previous_modified_user_id__c', 'previous_created_by__c', 'previous_assigned_user_id__c', 'Sugar_opportunity_id__c', 'Contract_Start_Date__c', 'Hardware_Resold__c', 'Storage_Resold__c', 'Contract_Term__c', 'Partner_Connections__c', 'Service_Revenue__c', 'Bundles_Revenue__c', 'Create_Future_Opportunity__c', 'Originating_Opportunity__c', 'Currently_Using_Hadoop__c', 'Data_Traffic_per_Day__c', 'Where_Hadoop__c', 'Analytics_Apps_Resold__c', 'Lead_Type__c', 'Subscription__c', 'Sent_To_Jira__c', 'Opportunity_Type__c', 'RSD_Total_Quota__c', 'Hadoop_Components_in_Use__c', 'BI_Resold__c', 'Partner_Sourced__c', 'Data_Warehouse_Resold__c', 'Order_Number__c', 'ETL_Resold__c', 'Renewal_Date_del__c', 'Days_to_Renewal__c', 'Opportunity_City__c', 'Opportunity_State__c', 'Opportunity_Country__c', 'Sales_Engineer__c', 'Support_Input__c', 'Networking_Resold__c', 'Reseller_Temp__c', 'Related_Technologies__c', 'Technologies_In_Use_Servers__c', 'Technologies_in_Use_Networking__c', 'Technologies_In_Use_OS__c', 'Technologies_In_Use_Data_Warehouse__c', 'Technologies_In_Use_BI__c', 'Technologies_In_Use_ETL__c', 'Technologies_In_Use_Analytics_Apps__c', 'OS_Resold__c', 'Other_Resold__c', 'Technologies_In_Use_Filled__c', 'Deal_Registration__c', 'Technologies_in_Use_Other__c', 'Deal_Registration_Date__c', 'Stage_Changed_Date__c', 'Competitor__c', 'Reason_Won_Lost__c', 'Services_Needed__c', 'Services_Stage__c', 'LID__LinkedIn_Company_Id__c', 'RSD_Name__c', 'Trial_Approved_By__c', 'Metric__c', 'Economic_Buyer__c', 'Decision_Criteria__c', 'Decision_Process__c'];

  var accountFields = "Id,Name,AnnualRevenue,CreatedDate,Description,Full_Address__c,Industry,Type, Website, CurrencyIsoCode, NumberOfEmployees, Owner.FirstName, Owner.LastName";
  var opportunityFields = "AccountId,Amount,CloseDate,CreatedDate,Fiscal_Period__c,ForecastCategory,Id,IsClosed,IsDeleted,IsSplit,IsWon,Name,Opportunity_Sales_Engineer__c, StageName, ForecastCategoryName";


  self.preloadAccounts = function(fullName) {
    return "SELECT " + accountFields + " FROM Account WHERE Id in (SELECT AccountId FROM Opportunity WHERE Opportunity_Sales_Engineer__c = '" + fullName + "' AND IsClosed = false)";
  };

  self.loadAccount = function(id) {
    return "SELECT " + accountFields + ", (SELECT Email,FirstName,LastName,MobilePhone,Name,Phone,Title FROM Contacts) FROM Account WHERE Id = '" + id + "'";
  };

  self.findAccountByName = function(name) {
    return "SELECT Id, Name, Owner.FirstName, Owner.LastName, Description FROM Account WHERE Name LIKE '%" + name + "%' LIMIT 10";
  };

  self.loadOpportunity = function(id) {
    return "SELECT " + opportunityFields + ", (SELECT Name, TeamMemberRole FROM OpportunityTeamMembers) FROM Opportunity WHERE AccountId = '" + id + "'";
  };

  self.findAccountByName = function (name) {
  	return "SELECT " + accountFields + " FROM Account WHERE Name LIKE '%" + name + "%' LIMIT 10";
  };

  return self;
});
