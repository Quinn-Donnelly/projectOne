package com.revature.api.delegate;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
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
	private static final Logger log = Logger.getLogger(ConnectionUtil.class);
	
	private JSONObject createEmpJson(Employee emp) {
		JSONObject json = new JSONObject();
		json.put("employee_id", emp.getEmployeeID());
		json.put("first_name", emp.getFirstName());
		json.put("last_name", emp.getLastName());
		json.put("email", emp.getEmail());
		json.put("manager_id", emp.getManagerID());
		json.put("address_id", emp.getAddress_id());
		return json;
	}
	
	public void get(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		int id = 0;
		try {
			id = Integer.parseInt(req.getParameter("id"));
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
			
			JSONObject json = createEmpJson(emp);  
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
			JSONObject json = createEmpJson(insertedEmp);  
			res.setContentType("application/json");
			out.print(json);
		} catch (Exception e) {
			res.sendError(500, "Unable to send newly created employee");
			log.error("Error in /EMPOLYEE POST unable to write to response" + e.getMessage());
			return;
		}
	}
}
