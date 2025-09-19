import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../services/teacher/teacher.service';
import { TeacherCreateDTO, TeacherReadDTO } from '../../../interface/teacher';
import { EmployeeReadDTO } from '../../../interface/employee';
import { EmployeeService } from '../../../services/employee/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  teacherForm!: FormGroup;
  employees: EmployeeReadDTO[] = []; // Lista de empleados
  isEditMode = false;
  teacherId!: number;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Crear formulario
    this.teacherForm = this.fb.group({
      idEmployee: ['', Validators.required]
    });


    // Cargar lista de empleados
    this.loadEmployees();

    // Verificar si estamos editando
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.teacherId = +id;
        this.loadTeacher(this.teacherId);
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Error cargando empleados', err)
    });
  }

  loadTeacher(id: number): void {
    this.teacherService.getTeacherById(id).subscribe({
      next: (teacher: TeacherReadDTO) => {
        this.teacherForm.patchValue({
          idEmployee: teacher.idEmployee
        });
      },
      error: (err) => console.error('Error cargando profesor', err)
    });
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) return;

    const dto: TeacherCreateDTO = this.teacherForm.value;

    if (this.isEditMode) {
      this.teacherService.updateTeacher(this.teacherId, dto).subscribe(() => {
        Swal.fire('Actualizado', 'El profesor fue actualizado correctamente', 'success')
          .then(() => this.router.navigate(['/teacher']));
      });
    } else {
      this.teacherService.createTeacher(dto).subscribe(() => {
        Swal.fire('Creado', 'El profesor fue creado correctamente', 'success')
          .then(() => this.router.navigate(['/teacher']));
      });
    }
  }
}
