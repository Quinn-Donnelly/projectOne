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
		Employee boss = new Employee(0, "Boss", "donnelly", "boss@gmail.com", "123", 0, 0);
		Address add = new Address(0, "USA", "", 70461, "118 Kilgore Ct.", 0);
		Employee insterted = EmployeeService.getService().createEmployee(emp, add);
		Employee bossI = EmployeeService.getService().createEmployee(boss, add);
		Request req = new Request(0, insterted.getEmployeeID(), 0, null, null, null, "Give Money", "I am broke and in need of money", null,
				1000000);
		System.out.println(EmployeeService.getService().getAllEmployees());

		Request reqI = RequestService.getService().makeRequest(req);
		System.out.println(RequestService.getService().getRequest(1));
		System.out.println(RequestService.getService().getAllRequests());
		reqI.setResolverID(bossI.getEmployeeID());
		reqI.setResolutionNote("Because I hate you");
		System.out.println(RequestService.getService().resolveRequest(reqI, false));
		System.out.println(RequestService.getService().getOwnedRequests(insterted.getEmployeeID()));
		insterted.setFirstName("WHAT");
		EmployeeService.getService().updateEmployee(insterted);
	}
}
