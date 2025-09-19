import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayTypeCreateDTO, PayTypeReadDTO } from '../../interface/payType';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayTypeService {
  constructor(private http: HttpClient) {}

  public getAllPayTypes(): Observable<PayTypeReadDTO[]> {
    return this.http.get<PayTypeReadDTO[]>(environment.api.payType);
  }

  public getPayTypeById(id: number): Observable<PayTypeReadDTO> {
    return this.http.get<PayTypeReadDTO>(`${environment.api.payType}/${id}`);
  }

  public createPayType(employee: PayTypeCreateDTO): Observable<PayTypeReadDTO> {
    return this.http.post<PayTypeReadDTO>(environment.api.payType, employee);
  }

  public updatePayType(id: number, employee: PayTypeCreateDTO): Observable<PayTypeReadDTO> {
    return this.http.put<PayTypeReadDTO>(`${environment.api.payType}/${id}`, employee);
  }

  public deletePayType(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api.payType}/${id}`);
  }
}
