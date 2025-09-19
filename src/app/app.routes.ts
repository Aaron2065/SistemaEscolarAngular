import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './pages/employee/employee-create/employee-create.component';
import { PayTypeListComponent } from './pages/payType/pay-type-list/pay-type-list.component';
import { PayTypeCreateComponent } from './pages/payType/pay-type-create/pay-type-create.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'employee',
        component: EmployeeListComponent
    },
    {
        path: 'employee-create', // crear
        component: EmployeeCreateComponent
    },
    {
        path: 'employee-create/:id', // editar
        component: EmployeeCreateComponent
    },
    {
        path: 'payType',
        component: PayTypeListComponent
    },
    {
        path: 'payType-create', // crear
        component: PayTypeCreateComponent
    },
    {
        path: 'payType-create/:id', // editar
        component: PayTypeCreateComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
