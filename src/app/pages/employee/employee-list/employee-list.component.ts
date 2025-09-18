import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { EmployeeReadDTO } from '../../../interface/employee';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee: EmployeeReadDTO[] = [];
  loading = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  // Listar Employees
  getEmployees(): void {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employee = data,
      error: (err) => console.error('Error al cargar empleados', err),
      complete: () => this.loading = false
    });
  }

  // Redirigir al componente employee-create para crear
  onCreate(): void {
    this.router.navigate(['/employee-create']);
  }

    // Redirigir al componente employee-create para editar
  onEdit(id: number): void {
    this.router.navigate(['/employee-create', id]);
  }

  // Eliminar con alertas SweetAlert
  onDelete(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employee = this.employee.filter(e => e.idEmployee !== id);
          Swal.fire(
            'Eliminado',
            'El empleado ha sido eliminado correctamente.',
            'success'
          );
        },
        error: (err) => {
          console.error(err);
          Swal.fire(
            'Error',
            'No se pudo eliminar el empleado.',
            'error'
          );
        }
      });
    }
  });
}
}
