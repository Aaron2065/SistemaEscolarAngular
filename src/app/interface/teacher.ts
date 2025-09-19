export interface TeacherReadDTO {
  idTeacher: number;
  idEmployee: number;  
  groupDisplayName: string;
}

export interface TeacherCreateDTO {
  idTeacher?: number;
  idEmployee: number;   
}
