import { Routes } from '@angular/router';
import { AssetsComponent } from './features/assets/assets.component';
import { AssetDetailComponent } from './features/asset-detail/asset-detail.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ServiceRequestsComponent } from './features/service-requests/service-requests.component';
import { RequestDetailComponent } from './features/request-detail/request-detail.component';
import { RequestFormComponent } from './features/request-form/request-form.component';
import { UsersComponent } from './features/users/users.component';
import { DepartmentsComponent } from './features/departments/departments.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'assets/:id', component: AssetDetailComponent },
  { path: 'service-requests', component: ServiceRequestsComponent },
  { path: 'service-requests/new', component: RequestFormComponent },
  { path: 'service-requests/:id', component: RequestDetailComponent },
  { path: 'users', component: UsersComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: '**', redirectTo: '' }
];
