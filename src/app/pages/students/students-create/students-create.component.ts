import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentsService } from '../../../services/students/students.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentsCreateDTO, StudentsReadDTO } from '../../../interface/students';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-create',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './students-create.component.html',
  styleUrl: './students-create.component.css'
})
export class StudentsCreateComponent {

  studentsForm!: FormGroup;
  isEditMode = false;
  studentsId!: number;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Crear el formulario con validaciones
    this.studentsForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.maxLength(2)]],
      logorl: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }
  
    onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.studentsForm.patchValue({fotourl: this.selectedFile}); // Actualiza el valor del control logo
    this.studentsForm.get('fotourl')?.updateValueAndValidity(); // Revalida el control logo

    // Verificar si es edición o creación
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.studentsId = +id;
        this.loadStudents(this.studentsId);
      }
    });
  }

  // Cargar datos si es edición
  loadStudents(id: number): void {
    this.studentsService.getStudentsById(id).subscribe({
      next: (students: StudentsReadDTO) => {
        this.studentsForm.patchValue({
          name: students.name,
          age: students.age,
          fotourl: students.fotoUrl
        });
      },
      error: (err) => console.error('Error cargando estudiante', err)
    });
  }

  // Guardar o actualizar
  onSubmit(): void {
    if (this.studentsForm.invalid) return;

    const studentsData: StudentsCreateDTO = this.studentsForm.value;

    if (this.isEditMode) {
      this.studentsService.updateStudents(this.studentsId, studentsData).subscribe({
        next: () => {
          Swal.fire(
            'Actualizado',
            'El estudiante ha sido actualizado correctamente.',
            'success'
          ).then(() => {
            this.router.navigate(['/students']);
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar el estudiante.', 'error');
        }
      });
    } else {
      this.studentsService.createStudents(studentsData).subscribe({
        next: () => {
          Swal.fire(
            'Creado',
            'El estudiante ha sido creado correctamente.',
            'success'
          ).then(() => {
            this.router.navigate(['/students']);
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo crear el estudiante.', 'error');
        }
      });
    }
  }
}
