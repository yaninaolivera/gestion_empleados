import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-nuevo',
  standalone: true,
  providers: [EmpleadoService],
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './empleado-nuevo.component.html',
  styleUrl: './empleado-nuevo.component.css'
})
export class EmpleadoNuevoComponent implements OnInit {
  form: FormGroup;
  errorForm: boolean = false; 

  paises = [
    {value:'Colombia', label:'Colombia'},
    {value:'Estados Unidos', label:'Estados Unidos'}
  ]
  tipoIdentificacion = [
    {value:'Cédula de Ciudadanía', label:'Cédula de Ciudadanía'},
    {value:'Cédula de Extranjería', label:'Cédula de Extranjería'},
    {value:'Pasaporte', label:'Pasaporte'},
    {value:'Permiso Espacial', label:'Permiso Espacial'}    
  ]
  areas = [
    {value: 'Administración', label:'Administración'},
    {value: 'Financiera', label:'Financiera'},
    {value: 'Compras', label:'Compras'},
    {value: 'Infraestructura', label:'Infraestructura'},
    {value: 'Talento Humano', label:'Talento Humano'},
    {value: 'Servicios Varios', label:'Servicios Varios'},
  ]

  constructor(
    private router: Router,
    private empleadoService: EmpleadoService,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      id: [''],
      primer_apellido: ['', [Validators.required, Validators.maxLength(20)]],
      segundo_apellido: ['', [Validators.required, Validators.maxLength(20)]],
      primer_nombre: ['', [Validators.required, Validators.maxLength(20)]],
      otro_nombre: ['', [Validators.required, Validators.maxLength(50)]],
      pais_empleo: ['', [Validators.required]],
      tipo_identificacion: ['', [Validators.required]],
      numero_identificacion: ['', [Validators.required, Validators.maxLength(20)]],
      fecha_ingreso: ['', [Validators.required, this.validarFecha]],
      area: ['', [Validators.required]],
    });
  }

  ngOnInit(): void{
    this.onEdit();
  }

  onSubmit(){
    if (this.form.valid) {
      if (this.form.get('id')?.value === '') {
        this.empleadoService.crearEmpleado(this.form.value).subscribe({
          next: (response) => {
            Swal.fire('', 'Registrado correctamente.', 'success');
            this.router.navigate(['/']);
          },
          error:(error) => {
            Swal.fire('', 'Error: '+error.error.errors, 'error');
          }
        });
      }else{
        this.empleadoService.actualizarEmpleado(this.form.get('id')?.value, this.form.value).subscribe({
          next: (response) => {
            Swal.fire('', 'Actualizado correctamente.', 'info');
            this.router.navigate(['/']);
          },
          error:(error) => {
            Swal.fire('', 'Error: '+error.error.errors, 'error');
          }
        });
      }
    }else{
      this.errorForm = true;
    }
  }

  onEdit(): void {
    const empleadoId = localStorage.getItem('empleado_id');
    if (empleadoId) {
      this.empleadoService.getEmpleado(BigInt(empleadoId)).subscribe({
        next: (response) => {
          this.form.get('id')?.setValue(response.id);
          this.form.get('primer_apellido')?.setValue(response.primer_apellido);
          this.form.get('segundo_apellido')?.setValue(response.segundo_apellido);
          this.form.get('primer_nombre')?.setValue(response.primer_nombre);
          this.form.get('otro_nombre')?.setValue(response.otro_nombre);
          this.form.get('pais_empleo')?.setValue(response.pais_empleo);
          this.form.get('tipo_identificacion')?.setValue(response.tipo_identificacion);
          this.form.get('numero_identificacion')?.setValue(response.numero_identificacion);
          this.form.get('fecha_ingreso')?.setValue(response.fecha_ingreso);
          this.form.get('area')?.setValue(response.area);

          localStorage.removeItem("empleado_id");
        },
        error:(error) => {
          Swal.fire('', 'Ocurrió un error', 'error');
        }
      });
    }
  }
  

  mayusculas(event: KeyboardEvent){
    const regex = /^[A-Z ]+$/;
    const isBackspaceOrDelete = event.key === 'Delete' || event.key === 'Backspace';

    if (!regex.test(event.key) && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

  alfanumerico(event: KeyboardEvent){
    const regex = /^[A-Za-z0-9 -]+$/;
    const isBackspaceOrDelete = event.key === 'Delete' || event.key === 'Backspace';

    if (!regex.test(event.key) && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

  validarFecha(control: AbstractControl): ValidationErrors | null {
    const fechaIngresada = new Date(control.value);
    const fechaActual = new Date();
    const fechaMinima = new Date();
    fechaMinima.setMonth(fechaMinima.getMonth() - 1);
    if (fechaIngresada < fechaMinima || fechaIngresada > fechaActual) {
      return { invalido: true};
    }
    return null;
  }
}
