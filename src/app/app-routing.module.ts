import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavComponent} from './nav/nav.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path:'' , redirectTo:'/home' , pathMatch:'full'},
  {path: 'home' , component: NavComponent},
  {path: 'profile' , component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
