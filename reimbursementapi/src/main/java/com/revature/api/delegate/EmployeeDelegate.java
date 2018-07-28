package com.revature.api.delegate;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.revature.api.beans.Employee;
import com.revature.api.services.EmployeeService;

public class EmployeeDelegate {
	static EmployeeService empService = EmployeeService.getService();
	
	public void get(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		int id = 0;
		try {
			id = Integer.parseInt(req.getParameter("id"));
		} catch (Exception e) {
			res.sendError(400, "No id was in the request or was misformatted");
			return;
		}
		
		JSONObject json = new JSONObject();
		PrintWriter out = null;
		
		try {
			Employee emp = EmployeeService.getService().getEmployee(id);
			
			if (emp == null) {
				res.sendError(404, "Requested id does not exist");
				return;
			}
			
			out = res.getWriter();
			
			json.put("employee_id", emp.getEmployeeID());
			json.put("first_name", emp.getFirstName());
			json.put("last_name", emp.getLastName());
			json.put("email", emp.getEmail());
			json.put("manager_id", emp.getManagerID());
			json.put("address_id", emp.getAddress_id());
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
}
