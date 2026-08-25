import { Routes } from '@angular/router';
import { AssetsComponent } from './features/assets/assets.component';
import { AssetDetailComponent } from './features/asset-detail/asset-detail.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ServiceRequestsComponent } from './features/service-requests/service-requests.component';
import { RequestDetailComponent } from './features/request-detail/request-detail.component';
import { RequestFormComponent } from './features/request-form/request-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'assets/:id', component: AssetDetailComponent },
  { path: 'service-requests', component: ServiceRequestsComponent },
  { path: 'service-requests/:id', component: RequestDetailComponent },
  { path: 'service-requests/new', component: RequestFormComponent },
  { path: 'users', component: DashboardComponent },
  { path: 'departments', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];
