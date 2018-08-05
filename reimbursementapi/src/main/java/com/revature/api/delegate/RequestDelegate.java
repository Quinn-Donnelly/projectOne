package com.revature.api.delegate;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;
import com.revature.api.beans.Request;
import com.revature.api.services.EmployeeService;
import com.revature.api.services.RequestService;

public class RequestDelegate {
	static private RequestService reqService = RequestService.getService();
	private static final Logger log = Logger.getLogger(RequestDelegate.class);
	
	public void get(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		String[] requestedResourse = req.getRequestURI().substring(req.getContextPath().length()+1).split("/");
		
		if (requestedResourse.length > 2) {
			res.sendError(404, "Requested resource not known to server");
			return;
		}
		
		if (requestedResourse.length == 1) {
			List<Request> list = new ArrayList<Request>();
			try {
				list = reqService.getAllRequests();
			} catch (Exception e) {
				res.sendError(500, "Unable to reach database");
				log.error("Error in GET /REQUEST unable to reach database: " + e.getMessage());
				return;
			}
			
			PrintWriter out = res.getWriter();
			try {
				ObjectMapper objMap = new ObjectMapper();
				res.setContentType("application/json");
				
				ObjectNode objNode = objMap.createObjectNode();
				ArrayNode arrNode = objMap.createArrayNode();
				for (Request request : list) {
					arrNode.addPOJO(request);
				}
				objNode.putPOJO("requests", arrNode);
				
				objMap.writeValue(out, objNode);
			} catch (Exception e) {
				res.sendError(500, "Unable to write to response");
				log.error("ERROR in GET /REQUEST unable to make json array to resonse: " + e.getMessage());
			} finally {
				if (out != null)
					out.close();
			}
			
			return;
		} // end of /request
		
		// beginning of /request/id
		int id = 0;
		try {
			id = Integer.parseInt(requestedResourse[1]);
		} catch (Exception e) {
			res.sendError(400, "No id was in the request or was misformatted");
			return;
		}
		
		PrintWriter out = null;
		
		try {
			Request request = RequestService.getService().getRequest(id);
			
			if (request == null) {
				res.sendError(404, "Requested id does not exist");
				return;
			}
			
			out = res.getWriter();
			
			ObjectMapper objMapper = new ObjectMapper();;
			res.setContentType("application/json");
			objMapper.writeValue(out, request);  			
		} catch (Exception e) {
			res.sendError(500);
			// log here
		} finally {
			if (out != null)
				out.close();
		}
	}
	
	public void post(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		String[] requestedResourse = req.getRequestURI().substring(req.getContextPath().length()+1).split("/");
		
		// this is a resolve request
		if (requestedResourse.length == 3 && requestedResourse[2].equals("resolve")) {
			Request request = null;
			boolean approoved = false;
			ObjectMapper objMap = new ObjectMapper();
			int id = 0;
			try {
				id = Integer.parseInt(requestedResourse[1]);
			} catch (NumberFormatException e) {
				res.sendError(400, "Must send a valid id for a request to resolve");
				return;
			}
			
			try {
				ObjectNode objNode = (ObjectNode) objMap.readTree(req.getReader());
				approoved = objNode.get("approoved").asBoolean();
				objNode.remove("approoved");
				request = objMap.treeToValue(objNode, Request.class);
				request.setRequestID(id);
			} catch (Exception e) {
				log.info(e.getMessage());
				res.sendError(400, "Required information not provided");
				return;
			}
			
			try {
				if(reqService.resolveRequest(request, approoved))
					res.setStatus(204);
				return;
			} catch (Exception e) {
				log.error("Error in /REQUEST/ID/RESOLVE unable to resolve " + e.getMessage());
				res.sendError(500, "Unable to resolve request");
				return;
			}
		}
		
		Request request = null;
		ObjectMapper objMap = new ObjectMapper();
		
		// Parse the body for input info
		try {
			ObjectNode json = (ObjectNode) objMap.readTree(req.getReader());
			
			request = objMap.treeToValue(json, Request.class);
		} catch (Exception e) {
			res.sendError(400, "Required information not present in body");
			log.info(e);
			return;
		}
		
		if (request.getAmount() <= 0) {
			res.sendError(400, "Amounts for requests must be greater than zero.");
			return;
		}
		
		Request insertedReq = null;
		try {
			insertedReq = reqService.makeRequest(request);
			if (insertedReq == null) {
				throw new Exception("DOA unable to make request");
			}
		} catch (Exception e) {
			res.sendError(500, "Error creating request in database");
			log.error("Error in /REQUEST POST unable to create request in database");
			return;
		}
		
		PrintWriter out = null;
		try {
			out = res.getWriter();
			res.setContentType("application/json");
			objMap.writeValue(out, insertedReq);
		} catch (Exception e) {
			res.sendError(500, "Unable to send newly created request");
			log.error("Error in /REQUEST POST unable to write to response" + e.getMessage());
		} finally {
			if (out != null) {
				out.close();
			}
		}
	}
}
