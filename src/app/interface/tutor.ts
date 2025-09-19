export interface TutorReadDTO {
  idTutor: number;
  idEmployee: number;  
  employeeDisplayName: string;
}

export interface TutorCreateDTO {
  idTutor?: number;
  idEmployee: number;   
}
