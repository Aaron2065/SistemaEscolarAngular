import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TutorReadDTO } from '../../../interface/tutor';
import { TutorService } from '../../../services/tutor/tutor.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutor-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './tutor-list.component.html',
  styleUrl: './tutor-list.component.css'
})
export class TutorListComponent implements OnInit{
  tutors: TutorReadDTO[] = [];
  loading = false;

  constructor(
    private tutorService: TutorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTutors();
  }

  getTutors(): void {
    this.loading = true;
    this.tutorService.getAllTutors().subscribe({
      next: (data) => this.tutors = data,
      error: (err) => console.error('Error al cargar tutores', err),
      complete: () => this.loading = false
    });
  }

  onCreate(): void {
    this.router.navigate(['/tutor-create']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/tutor-create', id]);
  }

  onDelete(id: number): void {
    Swal.fire({
      title: '¿Eliminar tutor?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tutorService.deleteTutor(id).subscribe({
          next: () => {
            this.tutors = this.tutors.filter(t => t.idTutor !== id);
            Swal.fire('Eliminado', 'El tutor fue eliminado.', 'success');
          },
          error: (err) => console.error('Error eliminando tutor', err)
        });
      }
    });
  }
}
