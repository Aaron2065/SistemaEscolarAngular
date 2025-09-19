import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher/teacher.service';
import { TeacherReadDTO } from '../../../interface/teacher';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  teachers: TeacherReadDTO[] = [];
  loading = false;

  constructor(
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.loading = true;
    this.teacherService.getAllTeachers().subscribe({
      next: (data) => this.teachers = data,
      error: (err) => console.error('Error al cargar profesores', err),
      complete: () => this.loading = false
    });
  }

  onCreate(): void {
    this.router.navigate(['/teacher-create']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/teacher-create', id]);
  }

  onDelete(id: number): void {
    Swal.fire({
      title: '¿Eliminar profesor?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teacherService.deleteTeacher(id).subscribe({
          next: () => {
            this.teachers = this.teachers.filter(t => t.idTeacher !== id);
            Swal.fire('Eliminado', 'El profesor fue eliminado.', 'success');
          },
          error: (err) => console.error('Error eliminando profesor', err)
        });
      }
    });
  }
}
