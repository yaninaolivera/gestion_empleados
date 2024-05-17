import { Routes } from '@angular/router';
import { EmpleadoListaComponent } from './pages/empleado-lista/empleado-lista.component';
import { EmpleadoNuevoComponent } from './pages/empleado-nuevo/empleado-nuevo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadoListaComponent },
  { path: 'empleados/nuevo', component: EmpleadoNuevoComponent },
  /*{ path: 'empleados/:id', component: EmpleadoDetalleComponent },
  { path: 'empleados/:id/editar', component: EmpleadoEditarComponent },*/
];
