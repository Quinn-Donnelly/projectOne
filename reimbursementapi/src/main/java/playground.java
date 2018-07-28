import com.revature.api.beans.Address;
import com.revature.api.beans.Employee;
import com.revature.services.EmployeeService;

public class playground {
	public static void main(String[] args) {
		Employee emp = new Employee(
				0,
				"quinn",
				"donnelly",
				"quinndonnelly22@gmail.com",
				"123",
				0,
				0
		);
		Address add = new Address(
				0,
				"USA",
				"LA",
				70461,
				"118 Kilgore Ct.",
				-1
		);
		System.out.println(EmployeeService.getService().createEmployee(emp, add));
	}
}
