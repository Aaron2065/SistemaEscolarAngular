import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherReadDTO, TeacherCreateDTO } from '../../interface/teacher';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<TeacherReadDTO[]> {
    return this.http.get<TeacherReadDTO[]>(environment.api.teachers);
  }

  getTeacherById(id: number): Observable<TeacherReadDTO> {
    return this.http.get<TeacherReadDTO>(`${environment.api.teachers}/${id}`);
  }

  createTeacher(dto: TeacherCreateDTO): Observable<TeacherReadDTO> {
    return this.http.post<TeacherReadDTO>(environment.api.teachers, dto);
  }

  updateTeacher(id: number, dto: TeacherCreateDTO): Observable<void> {
    return this.http.put<void>(`${environment.api.teachers}/${id}`, dto);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api.teachers}/${id}`);
  }
}
