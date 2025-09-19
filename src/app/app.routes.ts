import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './pages/employee/employee-create/employee-create.component';
import { PayTypeListComponent } from './pages/payType/pay-type-list/pay-type-list.component';
import { PayTypeCreateComponent } from './pages/payType/pay-type-create/pay-type-create.component';
import { TeacherListComponent } from './pages/teacher/teacher-list/teacher-list.component';
import { TeacherCreateComponent } from './pages/teacher/teacher-create/teacher-create.component';
import { TutorListComponent } from './pages/tutor/tutor-list/tutor-list.component';
import { TutorCreateComponent } from './pages/tutor/tutor-create/tutor-create.component';
import { classListComponent } from './pages/class/class-list/class.component';
import { classCreateComponent } from './pages/class/class-create/class-create.component';

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
        path: 'teacher',
        component: TeacherListComponent
    },
    {
        path: 'teacher-create', // crear
        component: TeacherCreateComponent
    },
    {
        path: 'teacher-create/:id', // editar
        component: TeacherCreateComponent
    },
    {
        path: 'tutor',
        component: TutorListComponent
    },
    {
        path: 'tutor-create', // crear
        component: TutorCreateComponent
    },
    {
        path: 'tutor-create/:id', // editar
        component: TutorCreateComponent
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
        path: 'class',
        component: classListComponent
    },
    {
        path: 'class-create', // crear
        component: classCreateComponent
    },
    {
        path: 'class-create/:id', // editar
        component: classCreateComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
