import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { EmployeeReadDTO } from '../../../interface/employee';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  getEmployees(): void {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employee = data,
      error: (err) => console.error('Error al cargar empleados', err),
      complete: () => this.loading = false
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['/employee-create', id]);
  }

  onDelete(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este empleado?')) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.employee = this.employee.filter(e => e.idEmployee !== id),
      error: (err) => console.error('Error eliminando empleado', err)
    });
  }

  onCreate(): void {
    this.router.navigate(['/employee-create']);
  }
}
