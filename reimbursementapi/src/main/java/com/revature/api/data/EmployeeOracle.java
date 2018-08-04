package com.revature.api.data;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;
import com.revature.api.util.ConnectionUtil;

public class EmployeeOracle implements EmployeeDOA {

	private static final Connection con = ConnectionUtil.getConnection();
	private static final Logger log = Logger.getLogger(ConnectionUtil.class);

	public Employee createEmployee(Employee emp, Address add) {
		try {
			String sql = "CALL ADD_EMPLOYEE(?,?,?,?,?,?,?,?,?,?,?,?)";
			CallableStatement ps = con.prepareCall(sql);
			ps.setString(1, emp.getFirstName());
			ps.setString(2, emp.getLastName());
			ps.setString(3, emp.getEmail());
			ps.setString(4, emp.getPassword());
			if (emp.getManagerID() == 0) {
				ps.setNull(5, java.sql.Types.NULL);
			} else {
				ps.setInt(5, emp.getManagerID());
			}
			ps.setString(6, add.getCountry());
			if (add.getStreet() == "") {
				ps.setNull(7, java.sql.Types.NULL);
			} else {
				ps.setString(7, add.getState());
			}
			ps.setInt(8, add.getZipcode());
			ps.setString(9, add.getStreet());
			if (add.getApartmentNumber() == 0) {
				ps.setNull(10, java.sql.Types.NULL);
			} else {
				ps.setInt(10, add.getApartmentNumber());
			}
			ps.registerOutParameter(11, java.sql.Types.INTEGER);
			ps.registerOutParameter(12, java.sql.Types.INTEGER);

			ps.execute();

			return new Employee(ps.getInt(11), emp.getFirstName(), emp.getLastName(), emp.getEmail(),
					emp.getPassword(), emp.getManagerID(), ps.getInt(12));
		} catch (SQLException e) {
			log.error("Error in create employee DOA: " + e.getMessage());
		}

		return null;
	}

	public boolean deleteEmployee(int id) {
		try {
			String sql = "DELETE FROM EMPLOYEES WHERE employee_id = ?";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, id);

			if (ps.executeUpdate() > 0)
				return true;
		} catch (SQLException e) {
			log.error("Error in delete employee DOA: " + e.getMessage());
		}

		return false;
	}

	public boolean updateEmployee(Employee emp) {
		try {
			String sql = "UPDATE EMPLOYEES SET first_name = ?, last_name = ?, email = ? WHERE employee_id = ?";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1, emp.getFirstName());
			ps.setString(2, emp.getLastName());
			ps.setString(3, emp.getEmail());
			ps.setInt(4, emp.getEmployeeID());

			if (ps.executeUpdate() > 0)
				return true;
		} catch (SQLException e) {
			log.error("Error in update employee DOA: " + e.getMessage());
		}

		return false;

	}

	public Employee getEmployee(int id) {
		try {
			String sql = "SELECT * FROM EMPLOYEES WHERE employee_id = ?";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, id);

			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				return new Employee (
					rs.getInt("EMPLOYEE_ID"), 
					rs.getString("FIRST_NAME"), 
					rs.getString("LAST_NAME"),
					rs.getString("EMAIL"),
					rs.getString("PASSWORD"),
					rs.getInt("MANAGER_ID"),
					rs.getInt("ADDRESS_ID")
				);
			}
		} catch (SQLException e) {
			log.error("Error in get employee DOA: " + e.getMessage());
		}

		return null;
	}

	public List<Employee> getAllEmployees() {
		try {
			String sql = "SELECT * FROM EMPLOYEES";
			PreparedStatement ps = con.prepareStatement(sql);

			ResultSet rs = ps.executeQuery();
			
			List<Employee> list = new ArrayList<Employee>();
			
			while(rs.next()) {
				list.add(new Employee (
					rs.getInt("EMPLOYEE_ID"), 
					rs.getString("FIRST_NAME"), 
					rs.getString("LAST_NAME"),
					rs.getString("EMAIL"),
					rs.getString("PASSWORD"),
					rs.getInt("MANAGER_ID"),
					rs.getInt("ADDRESS_ID")
				));
			}
			
			return list;
		} catch (SQLException e) {
			log.error("Error in get employee DOA: " + e.getMessage());
		}

		return null;
	}

	@Override
	public Employee getEmployee(String username) {
		try {
			String sql = "SELECT * FROM EMPLOYEES WHERE email = ?";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1, username);

			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				return new Employee (
					rs.getInt("EMPLOYEE_ID"), 
					rs.getString("FIRST_NAME"), 
					rs.getString("LAST_NAME"),
					rs.getString("EMAIL"),
					rs.getString("PASSWORD"),
					rs.getInt("MANAGER_ID"),
					rs.getInt("ADDRESS_ID")
				);
			}
		} catch (SQLException e) {
			log.error("Error in get employee (username) DOA: " + e.getMessage());
		}

		return null;
	}

}
