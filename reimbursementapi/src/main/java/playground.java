import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;
import com.revature.api.services.EmployeeService;

public class playground {
	public static void main(String[] args) {
		Employee emp = new Employee(
				0,
				"quinn",
				"donnelly",
				"quinndonnelly23@gmail.com",
				"123",
				0,
				0
		);
		Address add = new Address(
				0,
				"USA",
				"",
				70461,
				"118 Kilgore Ct.",
				0
		);
		Employee insterted = EmployeeService.getService().createEmployee(emp, add);
		System.out.println(EmployeeService.getService().getAllEmployees());
	}
}
