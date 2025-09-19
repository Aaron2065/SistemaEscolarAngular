import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StudentsReadDTO,StudentsCreateDTO } from '../../interface/students';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) {}

  public getAllStudents(): Observable<StudentsReadDTO[]> {
    return this.http.get<StudentsReadDTO[]>(environment.api.students);
  }

  public getStudentsById(id: number): Observable<StudentsReadDTO> {
    return this.http.get<StudentsReadDTO>(`${environment.api.students}/${id}`);
  }

  public createStudents(students: StudentsCreateDTO): Observable<StudentsReadDTO> {
    return this.http.post<StudentsReadDTO>(environment.api.students, students);
  }

  public updateStudents(id: number, student: StudentsCreateDTO): Observable<StudentsReadDTO> {
    return this.http.put<StudentsReadDTO>(`${environment.api.students}/${id}`, student);
  }

  public deleteStudents(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api.students}/${id}`);
  }
}
