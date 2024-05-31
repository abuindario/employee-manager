import { Injectable } from '@angular/core';
import { Employee  } from './employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class EmployeeService {
    private apiServerUrl = 'https://employee-manager-x53j.onrender.com/employee-manager';

    constructor(private http: HttpClient) {}

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/all-employees`);
    }

    public getEmployeeBtId(employeeId: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.apiServerUrl}/employe/${employeeId}`);
    }

    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerUrl}/new-employee`, employee);
    }

    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/update-employee`, employee);
    }

    public deleteEmployee(employeeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/delete-employee/${employeeId}`);
    }
}