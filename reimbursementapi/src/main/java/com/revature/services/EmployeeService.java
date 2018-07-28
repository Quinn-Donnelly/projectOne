package com.revature.services;

import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;
import com.revature.api.data.EmployeeDOA;
import com.revature.api.data.EmployeeOracle;

public class EmployeeService {
	
	private static EmployeeService instance;
	private static EmployeeDOA doa;
	
	private EmployeeService() {
	}
	
	public static EmployeeService getService() {
		if (instance == null) {
			instance = new EmployeeService();
			doa = new EmployeeOracle();
		}
		
		return instance;
	}
	
	public Employee createEmployee(Employee emp, Address add) {
		return doa.createEmployee(emp, add);
	}
}
