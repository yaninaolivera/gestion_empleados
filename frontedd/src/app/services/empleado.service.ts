import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpleadoResponse } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  buscarEmpleados(empleado: any): Observable<EmpleadoResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<EmpleadoResponse>(`${this.apiUrl}/empleados/buscar`, empleado, {headers});
  }

  getEmpleado(id: bigint): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empleados/${id}`);
  }

  crearEmpleado(empleado: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}/empleados`, empleado, {headers});
  }

  actualizarEmpleado(id: bigint, empleado: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(`${this.apiUrl}/empleados/${id}`, empleado, {headers});
  }

  eliminarEmpleado(id: bigint): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/empleados/${id}`);
  }
}
