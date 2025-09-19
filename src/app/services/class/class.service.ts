import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClassReadDTO,ClassCreateDTO } from '../../interface/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
constructor(private http: HttpClient) {}

  public getAllClass(): Observable<ClassReadDTO[]> {
    return this.http.get<ClassReadDTO[]>(environment.api.class);
  }

  public getClassById(id: number): Observable<ClassReadDTO> {
    return this.http.get<ClassReadDTO>(`${environment.api.class}/${id}`);
  }

  public createClass(Class: ClassCreateDTO): Observable<ClassReadDTO> {
    return this.http.post<ClassReadDTO>(environment.api.class, Class);
  }

  public updateClass(id: number, Class: ClassCreateDTO): Observable<ClassReadDTO> {
    return this.http.put<ClassReadDTO>(`${environment.api.class}/${id}`, Class);
  }

  public deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api.class}/${id}`);
  }
}
