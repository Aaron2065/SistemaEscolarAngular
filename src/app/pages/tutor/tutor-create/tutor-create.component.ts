import { Component, OnInit } from '@angular/core';
import { EmployeeReadDTO } from '../../../interface/employee';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee/employee.service';
import { TutorService } from '../../../services/tutor/tutor.service';
import { TutorCreateDTO, TutorReadDTO } from '../../../interface/tutor';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutor-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tutor-create.component.html',
  styleUrl: './tutor-create.component.css'
})
export class TutorCreateComponent implements OnInit{
  tutorForm!: FormGroup;
  employees: EmployeeReadDTO[] = []; // Lista de empleados
  isEditMode = false;
  tutorId!: number;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Crear formulario
    this.tutorForm = this.fb.group({
      idEmployee: ['', Validators.required]
    });


    // Cargar lista de empleados
    this.loadEmployees();

    // Verificar si estamos editando
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.tutorId = +id;
        this.loadTutor(this.tutorId);
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Error cargando empleados', err)
    });
  }

  loadTutor(id: number): void {
    this.tutorService.getTutorById(id).subscribe({
      next: (tutor: TutorReadDTO) => {
        this.tutorForm.patchValue({
          idEmployee: tutor.idEmployee
        });
      },
      error: (err) => console.error('Error cargando profesor', err)
    });
  }

  onSubmit(): void {
    if (this.tutorForm.invalid) return;

    const dto: TutorCreateDTO = this.tutorForm.value;

    if (this.isEditMode) {
      this.tutorService.updateTutor(this.tutorId, dto).subscribe(() => {
        Swal.fire('Actualizado', 'El profesor fue actualizado correctamente', 'success')
          .then(() => this.router.navigate(['/tutor']));
      });
    } else {
      this.tutorService.createTutor(dto).subscribe(() => {
        Swal.fire('Creado', 'El profesor fue creado correctamente', 'success')
          .then(() => this.router.navigate(['/tutor']));
      });
    }
  }
}
