import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { HttpClientModule } from '@angular/common/http';
import { Empleado, EmpleadoBuscar, EmpleadoPaginacion } from '../../interfaces/empleado';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleado-lista',
  standalone: true,
  providers: [EmpleadoService],
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './empleado-lista.component.html',
  styleUrl: './empleado-lista.component.css'
})
export class EmpleadoListaComponent implements OnInit{
  buscar: FormGroup;
  empleados: Empleado[] = [];
  paginacion: EmpleadoPaginacion = {
    current_page: 1,
    last_page: 1,
    total: 0
  }
  flaq: boolean = false;

  constructor(
    private router: Router,
    private empleadoService: EmpleadoService,
    private fb: FormBuilder
  ){
    this.buscar = this.fb.group({
      primer_apellido: [''],
      segundo_apellido: [''],
      primer_nombre: [''],
      otro_nombre: [''],
      pais_empleo: [''],
      tipo_identificacion: [''],
      numero_identificacion: [''],
      correo_electronico: [''],
      area: [''],
      estado: ['']
    });
  }

  ngOnInit(): void{
    this.ngLista();
  }

  ngLista(): void{
    this.flaq = true;
    this.empleadoService.buscarEmpleados(this.buscar.value).subscribe({
      next: (response) => {
        this.empleados = response.data;
        this.paginacion.current_page = response.current_page;
        this.paginacion.last_page = response.last_page;
        this.paginacion.total = response.total;
        this.flaq = false;
      },
      error: (error) => {
        this.flaq = false;
        Swal.fire('', 'Ocurrió un error', 'error');
      }
    })
  }

  ngPaginate(total: number): number[] {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  ngEdit(id:bigint): void{
    localStorage.setItem("empleado_id", String(id));
    this.router.navigate(['/empleados/nuevo'])
  }

  ngDelete(id:bigint): void{
    Swal.fire({
      title: 'Está seguro de que desea eliminar el empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.empleadoService.eliminarEmpleado(id).subscribe({
          next: (response) => {
            Swal.fire('', 'Eliminado correctamente.', 'success');
            this.ngLista();
          },
          error: (error) => {
            Swal.fire('', 'Ocurrió un error', 'error');
          }
        });
      }
    });
  }
  formatDate(date: Date): string {
    return new Date(date).toLocaleString('es-ES', { timeZone: 'UTC' });
  }
}
