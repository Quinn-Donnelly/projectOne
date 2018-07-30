package com.revature.api.data;

import java.util.List;

import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;

public interface EmployeeDOA {
	public Employee createEmployee(Employee emp, Address add);
	public boolean deleteEmployee(int id);
	public boolean updateEmployee(Employee emp);
	public Employee getEmployee(int id);
	public Employee getEmployee(String username);
	public List<Employee> getAllEmployees();
}
