import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsOpportunitiesComponent } from './opportunities.component';

describe('AccountsOpportunitiesComponent', () => {
  let component: AccountsOpportunitiesComponent;
  let fixture: ComponentFixture<AccountsOpportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsOpportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
