import java.io.File;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;
import com.revature.api.beans.Request;
import com.revature.api.services.EmployeeService;
import com.revature.api.services.RequestService;

public class playground {
	public static void main(String[] args) {
		Employee emp = new Employee(0, "quinn", "donnelly", "quinndonnelly23@gmail.com", "123", 0, 0);
		Address add = new Address(0, "USA", "", 70461, "118 Kilgore Ct.", 0);
		Employee insterted = EmployeeService.getService().createEmployee(emp, add);
		Request req = new Request(0, insterted.getEmployeeID(), 0, null, null, null, "Give Money", "I am broke and in need of money", null,
				1000000);
		System.out.println(EmployeeService.getService().getAllEmployees());

		System.out.println(RequestService.getService().makeRequest(req));
		System.out.println(RequestService.getService().getRequest(1));
	}
}
