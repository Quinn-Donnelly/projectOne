package com.revature.api.delegate;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.revature.api.beans.Employee;
import com.revature.api.services.EmployeeService;
import com.revature.api.util.ConnectionUtil;

public class LoginDelegate {
	
	private static final Logger log = Logger.getLogger(LoginDelegate.class);
	
	public void login(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		
		if (username == null || password == null) {
			resp.sendError(401, "username and password are required to login");
			return;
		}
		
		Employee emp = null;
		try {
			emp = EmployeeService.getService().getEmployee(username);
			if (emp == null) {
				resp.sendError(400, "Invalid username password combination");
				return;
			}
		} catch (Exception e) {
			resp.sendError(500, "Unable to connect to database");
			log.error("ERROR: unable to fetch user from database" + e.getMessage());
			return;
		}
		
		System.out.println(emp);
		
		if (emp.getPassword().equals(password)) {
			// correct combination
			HttpSession session = req.getSession();
			session.setAttribute("user", emp);
			
			resp.setContentType("application/json");
			PrintWriter out = resp.getWriter();
			out.print(emp.createEmpJson());
			out.close();
			return;
		} else {
			resp.sendError(400, "Invalid username password combination");
			return;
		}
	}
	
	public void logout(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		req.getSession().invalidate();
	}
}