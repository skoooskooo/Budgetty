import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', loadComponent: () =>  {
        return import('./pages/overview/overview.component').then(m => m.OverviewComponent) } },
    { path: 'overview', pathMatch: 'full', loadComponent: () =>  {
        return import('./pages/overview/overview.component').then(m => m.OverviewComponent) } },
    { path: 'spending', pathMatch: 'full', loadComponent: () =>  {
        return import('./pages/spending/spending.component').then(m => m.SpendingComponent) } },
    { path: 'user-settings', pathMatch: 'full', loadComponent: () =>  {
        return import('./pages/user-settings/user-settings.component').then(m => m.UserSettingsComponent) } }
];
