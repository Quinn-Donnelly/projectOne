package com.revature.api.delegate;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;
import com.revature.api.services.EmployeeService;
import com.revature.api.util.ConnectionUtil;

public class EmployeeDelegate {
	static EmployeeService empService = EmployeeService.getService();
	private static final Logger log = Logger.getLogger(EmployeeDelegate.class);
	
	public void get(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String[] requestedResourse = req.getRequestURI().substring(req.getContextPath().length()+1).split("/");
		
		// Valid get routes for the employee are on /employee and /employee/ID
		if (requestedResourse.length > 2) {
			res.sendError(404, "Requested resource not known to server");
			return;
		}
		
		// If get on /employee return all employees
		if (requestedResourse.length == 1) {
			List<Employee> list = null;
			try {
				list = EmployeeService.getService().getAllEmployees();
			} catch (Exception e) {
				res.sendError(500, "Unable to reach database");
				log.error("Error in GET /EMPLOYEE unable to reach database: " + e.getMessage());
				return;
			}
			
			try {
				JSONObject json = new JSONObject();
				for (Employee emp : list) {
					json.accumulate("employees", emp.createEmpJson());
				}
				
				PrintWriter out = res.getWriter();
				res.setContentType("application/json");
				out.print(json);
				out.close();
				return;
			} catch (Exception e) {
				res.sendError(500, "Unable to write to response");
				log.error("ERROR in GET /EMPLOYEE unable to make json array to resonse: " + e.getMessage());
				return;
			}	
		}
		
		int id = 0;
		try {
			id = Integer.parseInt(requestedResourse[1]);
		} catch (Exception e) {
			res.sendError(400, "No id was in the request or was misformatted");
			return;
		}
		
		PrintWriter out = null;
		
		try {
			Employee emp = EmployeeService.getService().getEmployee(id);
			
			if (emp == null) {
				res.sendError(404, "Requested id does not exist");
				return;
			}
			
			out = res.getWriter();
			
			JSONObject json = emp.createEmpJson();  
			res.setContentType("application/json");
			
			out.print(json);
		} catch (Exception e) {
			res.sendError(500);
			// log here
		} finally {
			if (out != null)
				out.close();
		}
	}
	
	public void post(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		Employee emp = null;
		Address addr = null;
		
		// Parse the body for input info
		try {
			String inputParams = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
			JSONObject inputJSON = new JSONObject(inputParams);
			emp = new Employee();
			emp.setFirstName(inputJSON.getString("first_name"));
			emp.setLastName(inputJSON.getString("last_name"));
			emp.setEmail(inputJSON.getString("email"));
			emp.setPassword(inputJSON.getString("password"));
			
			if (inputJSON.has("manager_id")) {
				emp.setManagerID(inputJSON.getInt("manager_id"));
			}
			
			addr = new Address();
			addr.setCountry(inputJSON.getString("country"));
			addr.setZipcode(inputJSON.getInt("zipcode"));
			addr.setStreet(inputJSON.getString("street"));
			
			if (inputJSON.has("state")) {
				addr.setState(inputJSON.getString("state"));
			}
			
			if (inputJSON.has("apartment_number")) {
				addr.setApartmentNumber(inputJSON.getInt("apartment_number"));
			}
		} catch (Exception e) {
			res.sendError(400, "Required information not present in body");
			return;
		}
		
		Employee insertedEmp = null;
		try {
			insertedEmp = empService.createEmployee(emp, addr);
			if (insertedEmp == null) {
				res.sendError(409,"Employee already exists with that email");
				return;
			}
		} catch (Exception e) {
			res.sendError(500, "Error creating employee in database");
			log.error("Error in /EMPOLYEE POST unable to create employee in database");
			return;
		}
		
		PrintWriter out = null;
		try {
			out = res.getWriter();
			JSONObject json = insertedEmp.createEmpJson();  
			res.setContentType("application/json");
			out.print(json);
		} catch (Exception e) {
			res.sendError(500, "Unable to send newly created employee");
			log.error("Error in /EMPOLYEE POST unable to write to response" + e.getMessage());
			return;
		}
	}
	
	public void delete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String[] requestedResourse = req.getRequestURI().substring(req.getContextPath().length()+1).split("/");
		
		// Valid get routes for the employee are on /employee and /employee/ID
		if (requestedResourse.length == 1) {
			res.sendError(403, "Not allowed to delete entire collections");
			return;
		}
		
		if (requestedResourse.length > 2) {
			res.sendError(404, "Requested resource not known to server");
			return;
		}
		
		int id = 0;
		try {
			id = Integer.parseInt(requestedResourse[1]);
		} catch (Exception e) {
			res.sendError(400, "The requested resoruce must be identified as an id (number)");
			return;
		}
		
		try {
			boolean deleted = EmployeeService.getService().deleteEmployee(id);
			if (!deleted) {
				res.sendError(404, "Could not find resource in database");
			}
			
			res.setStatus(200);
			return;
		} catch (Exception e) {
			res.sendError(500, "Unable to remove entry from database");
			return;
		}
	}
}
