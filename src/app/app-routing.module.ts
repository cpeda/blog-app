import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFeedComponent } from './components/main-feed/main-feed.component';
import { SingleViewComponent } from './components/single-view/single-view.component';
import { LoginComponent } from './components/login/login.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'create-blog', component: FormDialogComponent }, 
  { path: '', component: MainFeedComponent },
  { path: 'blog/:id', component: SingleViewComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


