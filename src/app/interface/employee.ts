export interface EmployeeReadDTO {
  idEmployee: number;
  name: string;
  bornDate: string;
}

export interface EmployeeCreateDTO {
  name: string;
  bornDate: string;
}
