package com.revature.api.data;

import java.util.List;

import com.revature.api.beans.Request;

public interface RequestDOA {
	public Request getRequest(int id);
	public List<Request> getAllRequests();
	public List<List<? extends Object>> getAllOwnedRequests(int id);
	public Request createRequest(Request req);
	public boolean resolveRequest(Request req, boolean approoved);
}
