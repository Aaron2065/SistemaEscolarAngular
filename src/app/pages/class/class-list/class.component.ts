import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../services/class/class.service';
import { ClassReadDTO } from '../../../interface/class';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class classListComponent implements OnInit {

  classRead: ClassReadDTO[] = [];
  loading = false;

  constructor(
    private classService: ClassService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.getClass();
  }

  // Listar Employees
  getClass(): void {
    this.loading = true;
    this.classService.getAllClass().subscribe({
      next: (data) => this.classRead = data,
      error: (err) => console.error('Error al cargar Materias', err),
      complete: () => this.loading = false
    });
  }

  // Redirigir al componente employee-create para crear
  onCreate(): void {
    this.router.navigate(['/class-create']);
  }

    // Redirigir al componente employee-create para editar
  onEdit(id: number): void {
    this.router.navigate(['/class-create', id]);
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
      this.classService.deleteClass(id).subscribe({
        next: () => {
          this.classRead = this.classRead.filter(e => e.idClass !== id);
          Swal.fire(
            'Eliminado',
            'La materia ha sido eliminada correctamente.',
            'success'
          );
        },
        error: (err) => {
          console.error(err);
          Swal.fire(
            'Error',
            'No se pudo eliminar la materia.',
            'error'
          );
        }
      });
    }
  });
}
}
