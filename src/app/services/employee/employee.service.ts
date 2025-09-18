import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EmployeeReadDTO, EmployeeCreateDTO } from '../../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  public getAllEmployees(): Observable<EmployeeReadDTO[]> {
    return this.http.get<EmployeeReadDTO[]>(environment.api.employees);
  }

  public getEmployeeById(id: number): Observable<EmployeeReadDTO> {
    return this.http.get<EmployeeReadDTO>(`${environment.api.employees}/${id}`);
  }

  public createEmployee(employee: EmployeeCreateDTO): Observable<EmployeeReadDTO> {
    return this.http.post<EmployeeReadDTO>(environment.api.employees, employee);
  }

  public updateEmployee(id: number, employee: EmployeeCreateDTO): Observable<EmployeeReadDTO> {
    return this.http.put<EmployeeReadDTO>(`${environment.api.employees}/${id}`, employee);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api.employees}/${id}`);
  }
}
