package com.revature.api.data;

import java.util.List;

import com.revature.api.beans.Request;

public interface RequestDOA {
	public Request getRequest(int id);
	public List<Request> getAllRequests();
	public List<Request> getAllOwnedRequests();
	public Request createRequest(Request req);
	public boolean resolveRequest(int id, boolean approved);
}
