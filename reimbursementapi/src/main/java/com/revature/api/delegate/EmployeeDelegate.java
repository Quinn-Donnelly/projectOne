package com.revature.api.delegate;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;


import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;
import com.revature.api.beans.Request;
import com.revature.api.services.EmployeeService;
import com.revature.api.services.RequestService;
import com.revature.api.util.ConnectionUtil;

public class EmployeeDelegate {
	static EmployeeService empService = EmployeeService.getService();
	private static final Logger log = Logger.getLogger(EmployeeDelegate.class);
	
	public void get(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String[] requestedResourse = req.getRequestURI().substring(req.getContextPath().length()+1).split("/");
		
		// Valid get routes for the employee are on /employee and /employee/ID
		if (requestedResourse.length > 3) {
			res.sendError(404, "Requested resource not known to server");
			return;
		}
		
		if (requestedResourse.length == 3) {
			int id = 0;
			try {
				id = Integer.parseInt(requestedResourse[1]);
			} catch (NumberFormatException e) {
				res.sendError(400, "Must request a valid id for employee");
				return;
			}
			
			List<List<? extends Object>> databaseList;
			List<Request> list;
			try {
				databaseList = RequestService.getService().getOwnedRequests(id);
				if (databaseList == null)
					throw new Exception("Unable to fetch requests for specified user");
			} catch (Exception e) {
				res.sendError(500, "Unable to reach database");
				log.error("Error in GET /EMPLOYEE/ID/REQUESTS unable to reach database: " + e.getMessage());
				return;
			}
			
			PrintWriter out = res.getWriter();
			try {
				ObjectMapper objMap = new ObjectMapper();
				res.setContentType("application/json");
				
				ObjectNode objNode = objMap.createObjectNode();
				ArrayNode arrNode = objMap.createArrayNode();
				for (int i = 0; i < databaseList.get(0).size(); ++i) {
					//ObjectNode requestObject = objMap.createObjectNode();
					ObjectNode requestJson  = objMap.valueToTree(databaseList.get(0).get(i));
					ObjectNode requesterJson = objMap.valueToTree(databaseList.get(1).get(i));
					ObjectNode resolverJson = objMap.valueToTree(databaseList.get(2).get(i));
					requestJson.set("requester", requesterJson);
					requestJson.set("resolver", resolverJson);
					arrNode.add(requestJson);
				}
				
				objNode.putPOJO("requests", arrNode);
				
				objMap.writeValue(out, objNode);
			} catch (Exception e) {
				res.sendError(500, "Unable to write to response");
				log.error("ERROR in GET /EMPLOYEE/ID/REQUESTS unable to make json array to resonse: " + e.getMessage());
			} finally {
				if (out != null)
					out.close();
			}
			
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
			
			PrintWriter out = res.getWriter();
			try {
				ObjectMapper objMap = new ObjectMapper();
				res.setContentType("application/json");
				
				ObjectNode objNode = objMap.createObjectNode();
				ArrayNode arrNode = objMap.createArrayNode();
				for (Employee emp : list) {
					arrNode.addPOJO(emp);
				}
				objNode.putPOJO("employees", arrNode);
				
				objMap.writeValue(out, objNode);
			} catch (Exception e) {
				res.sendError(500, "Unable to write to response");
				log.error("ERROR in GET /EMPLOYEE unable to make json array to resonse: " + e.getMessage());
			} finally {
				if (out != null)
					out.close();
			}
			return;
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
			
			ObjectMapper objMapper = new ObjectMapper();;
			res.setContentType("application/json");
			objMapper.writeValue(out, emp);  			
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

		ObjectMapper objMap = new ObjectMapper();
		
		// Parse the body for input info
		try {
			ObjectNode json = (ObjectNode) objMap.readTree(req.getReader());
			ObjectNode address = (ObjectNode) json.get("address");
			json.remove("address");
			emp = objMap.treeToValue(json, Employee.class);
			addr = objMap.treeToValue(address, Address.class);
		} catch (Exception e) {
			res.sendError(400, "Required information not present in body");
			log.info(e);

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
			res.setContentType("application/json");
			objMap.writeValue(out, insertedEmp);
		} catch (Exception e) {
			res.sendError(500, "Unable to send newly created employee");
			log.error("Error in /EMPOLYEE POST unable to write to response" + e.getMessage());
		} finally {
			if (out != null) {
				out.close();
			}
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
	
	public void put(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		String[] requestedResourse = req.getRequestURI().substring(req.getContextPath().length()+1).split("/");
		
		// Valid get routes for the employee are on /employee/:id
		if (requestedResourse.length != 2) {
			res.sendError(404, "Only allowed to update single employee");
			return;
		}
		
		int id = 0;
		try {
			id = Integer.parseInt(requestedResourse[1]);
		} catch (Exception e) {
			res.sendError(400, "Must be a valid id");
			return;
		}
		
		Employee old = null;
		try {
			old = EmployeeService.getService().getEmployee(id);
		} catch (Exception e) {
			res.sendError(404, "Unable to find Employee");
			return;
		}
		
		ObjectMapper objMap = new ObjectMapper();
		Employee setUpdates = null;
		try {			
			setUpdates = objMap.readValue(req.getReader(), Employee.class);
		} catch (Exception e) {
			res.sendError(400, "Misformatted JSON");
			return;
		}
		
		setUpdates.setEmployeeID(old.getEmployeeID());
		
		try {
			if (!EmployeeService.getService().updateEmployee(setUpdates)) {
				throw new Exception();
			}
		} catch (Exception e) {
			res.sendError(500, "Unable to update database");
			log.error("Unable to update employee: " + e.getMessage());
			return;
		}
		
		res.setStatus(200);
		Employee updated = null;
		try {
			updated = EmployeeService.getService().getEmployee(id);
		} catch (Exception e) {
			res.sendError(404, "Unable to find Employee");
			return;
		}
		
		ObjectMapper objMapper = new ObjectMapper();;
		res.setContentType("application/json");
		objMapper.writeValue(res.getWriter(), updated);
	}
}
