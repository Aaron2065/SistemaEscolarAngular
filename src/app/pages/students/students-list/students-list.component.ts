import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/students/students.service';
import { StudentsReadDTO } from '../../../interface/students';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent {

  students: StudentsReadDTO[] = [];
  loading = false;

  constructor(
    private studentsService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  // Listar Employees
  getStudents(): void {
    this.loading = true;
    this.studentsService.getAllStudents().subscribe({
      next: (data) => {this.students = data;console.log("DATA RECIBIDA:", data);},
      error: (err) => console.error('Error al cargar estudiantes', err),
      complete: () => this.loading = false
    });
  }

  // Redirigir al componente employee-create para crear
  onCreate(): void {
    this.router.navigate(['/students-create']);
  }

    // Redirigir al componente employee-create para editar
  onEdit(id: number): void {
    console.log('Id recibido: ',id);
    this.router.navigate(['/students-create', id]);
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
      this.studentsService.deleteStudents(id).subscribe({
        next: () => {
          this.students = this.students.filter(e => e.idStudent !== id);
          Swal.fire(
            'Eliminado',
            'El estudiante ha sido eliminado correctamente.',
            'success'
          );
        },
        error: (err) => {
          console.error(err);
          Swal.fire(
            'Error',
            'No se pudo eliminar el estudiante.',
            'error'
          );
        }
      });
    }
  });
}
}
