import { HomeComponent } from './components/home/home.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountsSearchComponent } from './components/accounts/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TemplatesComponent } from './components/templates/templates.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
