export interface TeacherReadDTO {
  idTeacher: number;
  idEmployee: number;  
  groupDisplayName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeacherCreateDTO {
  idTeacher?: number;
  idEmployee: number;   
}
