package com.darioabuin.employeemanager.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darioabuin.employeemanager.exceptions.EmployeeNotFoundException;
import com.darioabuin.employeemanager.model.Employee;
import com.darioabuin.employeemanager.repo.EmployeeRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService {
	private final EmployeeRepo employeeRepo;
	
	@Autowired
	public EmployeeService(EmployeeRepo employeeRepo) {
		this.employeeRepo = employeeRepo;
	}
	
	public Employee addEmployee(Employee employee) {
		employee.setEmployeeCode(UUID.randomUUID().toString());
		return employeeRepo.save(employee);
	}
	
	public List<Employee> findAllEmployees() {
		return employeeRepo.findAll();
	}
	
	public Employee updateEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}
	
	public void deleteEmployee(Long id) {
		employeeRepo.deleteById(id);
	}
	
	public Employee findEmployeeById(Long id) {
		return employeeRepo.findById(id)
				.orElseThrow(() -> new EmployeeNotFoundException ("User by id " + id + " was not found."));
	}
}
