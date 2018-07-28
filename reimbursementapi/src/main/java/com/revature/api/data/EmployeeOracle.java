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
			ps.setInt(5, emp.getManagerID());
			ps.setString(6, add.getCountry());
			ps.setString(7, add.getState());
			ps.setInt(8, add.getZipcode());
			ps.setString(9, add.getStreet());
			ps.setInt(10, add.getApartmentNumber());
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
		// TODO Auto-generated method stub
		return false;
	}

	public boolean updateEmployee(Employee emp) {
		// TODO Auto-generated method stub
		return false;
	}

	public Employee getEmployee(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Employee> getAllEmployees() {
		// TODO Auto-generated method stub
		return null;
	}

}
