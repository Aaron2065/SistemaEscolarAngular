import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeCreateDTO, EmployeeReadDTO } from '../../../interface/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent implements OnInit {

  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    // 1️⃣ Crear el formulario con validaciones
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      bornDate: ['', Validators.required]
    });

    // 2️⃣ Verificar si es edición o creación
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.loadEmployee(this.employeeId);
      }
    });
  }

  // Cargar datos si es edición
  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee: EmployeeReadDTO) => {
        this.employeeForm.patchValue({
          name: employee.name,
          bornDate: employee.bornDate.substring(0, 10) // YYYY-MM-DD
        });
      },
      error: (err) => console.error('Error cargando empleado', err)
    });
  }

  // Guardar o actualizar
  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    const employeeData: EmployeeCreateDTO = this.employeeForm.value;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.createEmployee(employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}