import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { PayTypeService } from '../../../services/payType/pay-type.service';
import { PayTypeCreateDTO, PayTypeReadDTO } from '../../../interface/payType';

@Component({
  selector: 'app-pay-type-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pay-type-create.component.html',
  styleUrl: './pay-type-create.component.css'
})
export class PayTypeCreateComponent {
  paytypeForm!: FormGroup;
  isEditMode = false;
  paytypeId!: number;

  constructor(
    private fb: FormBuilder,
    private payTypeService: PayTypeService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Crear el formulario con validaciones
    this.paytypeForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(100)]]
    });

    // Verificar si es edición o creación
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.paytypeId = +id;
        this.loadTypePay(this.paytypeId);
      }
    });
  }

  // Cargar datos si es edición
  loadTypePay(id: number): void {
    this.payTypeService.getPayTypeById(id).subscribe({
      next: (paytype:PayTypeReadDTO) => {
        this.paytypeForm.patchValue({
          description: paytype.description,
        });
      },
      error: (err) => console.error('Error cargando tipo de pago', err)
    });
  }

  // Guardar o actualizar
  onSubmit(): void {
    if (this.paytypeForm.invalid) return;

    const paytypeData: PayTypeCreateDTO = this.paytypeForm.value;

    if (this.isEditMode) {
      this.payTypeService.updatePayType(this.paytypeId, paytypeData).subscribe({
        next: () => {
          Swal.fire(
            'Actualizado',
            'El tipo de pago ha sido actualizado correctamente.',
            'success'
          ).then(() => {
            this.router.navigate(['/payType']);
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar el tipo de pago.', 'error');
        }
      });
    } else {
      this.payTypeService.createPayType(paytypeData).subscribe({
        next: () => {
          Swal.fire(
            'Creado',
            'El tipo de pago ha sido creado correctamente.',
            'success'
          ).then(() => {
            this.router.navigate(['/payType']);
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo crear el tipo de pago p-t-c.c.ts L92.', 'error');
        }
      });
    }
  }
}
