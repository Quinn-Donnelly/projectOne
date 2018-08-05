package com.revature.api.services;

import java.util.List;

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
	
	public boolean deleteEmployee(int id) {
		return doa.deleteEmployee(id);
	}
	
	public Employee getEmployee(int id) {
		return doa.getEmployee(id);
	}
	
	public Employee getEmployee(String username) {
		return doa.getEmployee(username);
	}
	
	public List<Employee> getAllEmployees() {
		return doa.getAllEmployees();
	}
	
	public boolean updateEmployee(Employee emp) {
		return doa.updateEmployee(emp);
	}
}
