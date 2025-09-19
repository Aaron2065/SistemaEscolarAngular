import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './pages/employee/employee-create/employee-create.component';
import { PayTypeListComponent } from './pages/payType/pay-type-list/pay-type-list.component';
import { PayTypeCreateComponent } from './pages/payType/pay-type-create/pay-type-create.component';
import { classListComponent } from './pages/class/class-list/class.component';
import { classCreateComponent } from './pages/class/class-create/class-create.component';
import { TeacherCreateComponent } from './pages/teacher/teacher-create/teacher-create.component';
import { TeacherListComponent } from './pages/teacher/teacher-list/teacher-list.component';
import { StudentsListComponent } from './pages/students/students-list/students-list.component';
import { StudentsCreateComponent } from './pages/students/students-create/students-create.component';

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
        path: 'students',
        component: StudentsListComponent
    },
    {
        path: 'students-create', // crear
        component: StudentsCreateComponent
    },
    {
        path: 'students-create/:id', // editar
        component: StudentsCreateComponent
    },
    
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
