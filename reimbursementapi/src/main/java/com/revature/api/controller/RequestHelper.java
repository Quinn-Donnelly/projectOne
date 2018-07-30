package com.revature.api.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.api.delegate.EmployeeDelegate;

public class RequestHelper {
	private EmployeeDelegate employeeDelegate = new EmployeeDelegate();
	public void process(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String switchString = req.getRequestURI().substring(req.getContextPath().length()+1);
		
		while(switchString.indexOf("/")>0) {
			switchString = switchString.substring(0, switchString.indexOf("/"));
		}
		
		switch(switchString) {
		case "employees":
		case "employee":
			if ("GET".equals(req.getMethod()))
				employeeDelegate.get(req, res);
			if ("POST".equals(req.getMethod()))
				employeeDelegate.post(req, res);
			break;
		default: 
			res.setStatus(304);
			break;
		}
	}
}