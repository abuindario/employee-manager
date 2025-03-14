import { Component, OnInit, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from './employee';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService) {}
 
  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
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
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else if(mode === 'edit') {
      if(employee != null)
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    } else if(mode === 'delete') {
      if(employee != null)
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
  
  // public onAddEmloyee(addForm: NgForm): void {
  //   let button = document.getElementById('add-employee-form');
  //   if(button != null)
  //   button.click
  //   this.employeeService.addEmployee(addForm.value).subscribe(
  //     (response: Employee) => {
  //       console.log(response);
  //       this.getEmployees();
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }

  // public onUpdateEmloyee(employee: Employee): void {
  //   this.employeeService.updateEmployee(employee).subscribe(
  //     (response: Employee) => {
  //       console.log(response);
  //       this.getEmployees();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // public onDeleteEmloyee(employeeId: number): void {
  //   this.employeeService.deleteEmployee(employeeId).subscribe(
  //     (response: void) => {
  //       console.log(response);
  //       this.getEmployees();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

}
