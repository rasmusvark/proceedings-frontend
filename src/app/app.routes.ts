import { Routes } from '@angular/router';
import { ProceedingsFormComponent } from './proceedings-form/proceedings-form.component';
import { ProceedingsListComponent } from './proceedings-list/proceedings-list.component';
import { HomeviewComponent } from './homeview/homeview.component';

export const routes: Routes = [

  { path: 'new-proceeding', component: ProceedingsFormComponent },
  { path: 'proceedings-list', component: ProceedingsListComponent},
  { path: '', component: HomeviewComponent }, 
];
