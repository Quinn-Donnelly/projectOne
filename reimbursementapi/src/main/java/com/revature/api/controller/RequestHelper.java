package com.revature.api.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.api.delegate.EmployeeDelegate;
import com.revature.api.delegate.LoginDelegate;

public class RequestHelper {
	private EmployeeDelegate employeeDelegate = new EmployeeDelegate();
	private LoginDelegate loginDelegate = new LoginDelegate();
	public void process(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String switchString = req.getRequestURI().substring(req.getContextPath().length()+1);
		
		while(switchString.indexOf("/")>0) {
			switchString = switchString.substring(0, switchString.indexOf("/"));
		}
		
		switch(switchString) {
		case "login":
			if ("GET".equals(req.getMethod()) || "POST".equals(req.getMethod()))
				loginDelegate.login(req, res);
			break;
		case "logout":
			if ("GET".equals(req.getMethod()) || "POST".equals(req.getMethod()))
				loginDelegate.logout(req, res);
			break;
		case "employees":
		case "employee":
			if ("GET".equals(req.getMethod()))
				employeeDelegate.get(req, res);
			if ("POST".equals(req.getMethod()))
				employeeDelegate.post(req, res);
			if ("DELETE".equals(req.getMethod()))
				employeeDelegate.delete(req, res);
			break;
		default: 
			res.setStatus(304);
			break;
		}
	}
}