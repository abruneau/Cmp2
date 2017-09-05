import { HomeComponent } from './components/home/home.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountsSearchComponent } from './components/accounts/search/search.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { BlankComponent } from './components/blank/blank.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }, {
    path: 'search',
    component: AccountsSearchComponent
  }, {
    path: 'account/:id',
    component: AccountsComponent
  }, {
    path: 'templates',
    component: TemplatesComponent
  }, {
    path: 'dashboards/:id',
    component: DashboardsComponent
  }, {
    path: 'blank',
    component: BlankComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
