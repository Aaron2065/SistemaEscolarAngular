import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayTypeService } from '../../../services/payType/pay-type.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PayTypeCreateDTO, PayTypeReadDTO } from '../../../interface/payType';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pay-type-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './pay-type-list.component.html',
  styleUrl: './pay-type-list.component.css'
})
export class PayTypeListComponent implements OnInit {
  payType: PayTypeReadDTO[] = [];
  loading = false;

  constructor(
    private payTypeService: PayTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPayType();
  }

  // Listar Employees
  getPayType(): void {
    this.loading = true;
    this.payTypeService.getAllPayTypes().subscribe({
      next: (data) => this.payType = data,
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
        this.payTypeService.deletePayType(id).subscribe({
          next: () => {
            this.payType = this.payType.filter(e => e.idPayType !== id);
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
