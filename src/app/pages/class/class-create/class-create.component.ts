import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassCreateDTO, ClassReadDTO } from '../../../interface/class';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ClassService } from '../../../services/class/class.service';


@Component({
  selector: 'app-class-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})

export class classCreateComponent implements OnInit {

  classForm!: FormGroup;
  isEditMode = false;
  classId!: number;

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Crear el formulario con validaciones
    this.classForm = this.fb.group({
      ClassName: ['', [Validators.required, Validators.maxLength(100)]]
    });

    // Verificar si es edición o creación
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.classId = +id;
        this.loadClass(this.classId);
      }
    });
  }

  // Cargar datos si es edición
  loadClass(id: number): void {
    
    this.classService.getClassById(id).subscribe({
      next: (classe: ClassReadDTO) => {
        this.classForm.patchValue({
          ClassName: classe.className
        });
      },
      error: (err) => console.error('Error cargando Materia', err)
    });
  }

  // Guardar o actualizar
  onSubmit(): void {
    if (this.classForm.invalid) return;

    const classData: ClassCreateDTO = this.classForm.value;

    if (this.isEditMode) {
      this.classService.updateClass(this.classId, classData).subscribe({
        next: () => {
          Swal.fire(
            'Actualizado',
            'La materia ha sido actualizada correctamente.',
            'success'
          ).then(() => {
            this.router.navigate(['/class']);
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar la clase.', 'error');
        }
      });
    } else {
      this.classService.createClass(classData).subscribe({
        next: () => {
          Swal.fire(
            'Creado',
            'La materia ha sido creada correctamente.',
            'success'
          ).then(() => {
            this.router.navigate(['/class']);
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo crear la materia.', 'error');
        }
      });
    }
  }
}