package com.darioabuin.employeemanager.exceptions;

public class EmployeeNotFoundException extends RuntimeException {
	
	public EmployeeNotFoundException(String msg) {
		super(msg);
	}
}
