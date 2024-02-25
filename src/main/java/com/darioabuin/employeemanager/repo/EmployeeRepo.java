package com.darioabuin.employeemanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darioabuin.employeemanager.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long>{

}
