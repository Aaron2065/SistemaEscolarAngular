import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TutorCreateDTO, TutorReadDTO } from '../../interface/tutor';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) {}

  getAllTutors(): Observable<TutorReadDTO[]> {
    return this.http.get<TutorReadDTO[]>(environment.api.tutors);
  }

  getTutorById(id: number): Observable<TutorReadDTO> {
    return this.http.get<TutorReadDTO>(`${environment.api.tutors}/${id}`);
  }

  createTutor(dto: TutorCreateDTO): Observable<TutorReadDTO> {
    return this.http.post<TutorReadDTO>(environment.api.tutors, dto);
  }

  updateTutor(id: number, dto: TutorCreateDTO): Observable<void> {
    return this.http.put<void>(`${environment.api.tutors}/${id}`, dto);
  }

  deleteTutor(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api.tutors}/${id}`);
  }
}
