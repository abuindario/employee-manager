import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public employees!: Employee[];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;
  public allEmployees!: Employee[];

  constructor(private employeeService: EmployeeService) {}
 
  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.allEmployees = response;
        // console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(mode: string, employee: Employee | null): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    } else if(mode === 'edit') {
      if(employee != null)
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    } else if(mode === 'delete') {
      if(employee != null)
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
  
  public onAddEmloyee(addForm: NgForm): void {
    let button = document.getElementById('add-employee-form');
    if(button != null)
    button.click
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: String): void {
    if (!key) {
      this.getEmployees();
    } else {
      const results: Employee[] = [];
      for(const employee of this.allEmployees) {
        if(employee.name.toLowerCase().indexOf(key.trim().toLowerCase()) != -1
        || employee.jobTitle.toLowerCase().indexOf(key.trim().toLowerCase()) != -1
        || employee.phone.toLowerCase().indexOf(key.trim().toLowerCase()) != -1 
        || employee.email.toLowerCase().indexOf(key.trim().toLowerCase()) != -1) {
          results.push(employee);
        }
      }
      this.employees = results;
   }
}
}

