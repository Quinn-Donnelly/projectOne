package com.revature.api.services;

import java.util.List;

import com.revature.api.beans.Request;
import com.revature.api.data.RequestDOA;
import com.revature.api.data.RequestOracle;

public class RequestService {
	private static RequestService instance;
	private static RequestDOA doa;
	
	private RequestService() {
	}
	
	public static RequestService getService() {
		if (instance == null) {
			instance = new RequestService();
			doa = new RequestOracle();
		}
		
		return instance;
	}
	
	public Request makeRequest(Request req) {
		return doa.createRequest(req);
	}
	
	public Request getRequest(int id) {
		return doa.getRequest(id);
	}
	
	public List<Request> getAllRequests() {
		return doa.getAllRequests();
	}
	
	public boolean resolveRequest(Request req, boolean approoved) {
		return doa.resolveRequest(req, approoved);
	}
	
	public List<List<? extends Object>> getOwnedRequests(int id) {
		return doa.getAllOwnedRequests(id);
	}
}
