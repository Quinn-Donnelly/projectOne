package com.revature.api.data;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.api.beans.Employee;
import com.revature.api.beans.Request;
import com.revature.api.util.ConnectionUtil;

public class RequestOracle implements RequestDOA {

	private static final Connection con = ConnectionUtil.getConnection();
	private static final Logger log = Logger.getLogger(ConnectionUtil.class);

	@Override
	public Request getRequest(int id) {
		try {
			String sql = "SELECT * FROM REQUESTS WHERE request_id = ?";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, id);

			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				return new Request (
					rs.getInt("REQUEST_ID"), 
					rs.getInt("REQUESTER_ID"), 
					rs.getInt("RESOLVER_ID"),
					rs.getTimestamp("DATE_OF_REQUEST"),
					rs.getTimestamp("DATE_OF_RESOLUTION"),
					rs.getString("STATUS"),
					rs.getString("TITLE"),
					rs.getString("DESCRIPTION"),
					rs.getString("RESOLUTION_NOTE"),
					rs.getFloat("AMOUNT")
				);
			}
		} catch (SQLException e) {
			log.error("Error in get request DOA: " + e.getMessage());
		}

		return null;
	}

	@Override
	public List<Request> getAllRequests() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Request> getAllOwnedRequests() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Request createRequest(Request req) {
		try {
			String sql = "CALL ADD_REQUEST(?,?,?,?,?,?)";
			CallableStatement ps = con.prepareCall(sql);
			ps.setInt(1, req.getRequesterID());
			ps.setString(2, req.getTitle());
			ps.setString(3, req.getDescription());
			ps.setFloat(4, req.getAmount());
			ps.registerOutParameter(5, java.sql.Types.INTEGER);
			ps.registerOutParameter(6, java.sql.Types.TIMESTAMP);

			ps.execute();

			return new Request(ps.getInt(5), req.getRequesterID(), 0, ps.getTimestamp(6), null, "NEW", req.getTitle(),
					req.getDescription(), null, req.getAmount());
		} catch (SQLException e) {
			log.error("Error in create request DOA: " + e.getMessage());
		}

		return null;
	}

	@Override
	public boolean resolveRequest(int id, boolean approved) {
		// TODO Auto-generated method stub
		return false;
	}

}
