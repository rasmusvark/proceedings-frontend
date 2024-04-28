// app.routes.ts
import { Routes } from '@angular/router';
import { ProceedingsFormComponent } from './proceedings-form/proceedings-form.component';
import { ProceedingsListComponent } from './proceedings-list/proceedings-list.component';

export const routes: Routes = [

  { path: 'new-proceeding', component: ProceedingsFormComponent },
  { path: 'proceedings-list', component: ProceedingsListComponent}
];
