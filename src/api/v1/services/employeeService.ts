import { Employees } from "../models/employeeModel";
import { employeesData } from "src/data/employee";

const employees: Employees[] = [...employeesData];

/**
 * Retrieves all employees 
 * @returns Array of employees
 */
export const getAllEmployees = async (): Promise<Employees[]> => {
    return structuredClone(employees);
}

/**
 * Creates a new employee
 * @param employeeData - The data for the new employee including:
 *      - name (string)
 *      - position (string)
 *      - department (string)
 *      - email (string)
 *      - phone (string)
 *      - branchId (number)
 * @returns The new employee with a generated ID.
 */
export const createEmployee = async (employeeData: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number; 
}): Promise<Employees> => {
    const newEmployee: Employees = {

        // Creates a unique ID for the employee
        id: Date.now(),
        name: employeeData.name,
        position: employeeData.position,
        department: employeeData.department,
        email: employeeData.email,
        phone: employeeData.phone,
        branchId: employeeData.branchId,
    };

    employees.push(newEmployee);

    return structuredClone(newEmployee)
};

/**
 * 
 * @param id - The id of the employee to update
 * @param employeeData - The fields to update
 *      - name (string)
 *      - position (string)
 *      - department (string)
 *      - email (string)
 *      - phone (string)
 *      - branchId (number)
 * @returns The employee with updated information
 * @throws Error if employee with ID is not found
 */
export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employees, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise <Employees> => {

    const index: number = employees.findIndex((employee: Employees) => employee.id === id);

    // Throw error if the Employee associated with the ID does not exist.
    if(index === -1){
        throw new Error (`Employee with ID ${id} does not exist`);
    }

    employees[index] ={
        ...employees[index],
        ...employeeData
    };

    return structuredClone(employees[index]);
};

/**
 * Deletes an employee from the array
 * @param id - The ID of the employee to be deleted 
 * @throws - Error if employee with ID is not found
 */
export const deleteEmployee = async (id: number): Promise<void> => {
    const index: number = employees.findIndex((employee: Employees) => employee.id === id);

    if (index === -1){
        throw new Error (`Employee with ID ${id} does not exist`);
    }

    // If ID is found, remove at that index
    employees.splice(index,1)
}

/**
 * Gets a single Employee by ID
 * @param id - The ID of the Employee to return
 * @returns The Employee information with the matching ID
 * @throws Error if the employee ID does not exist
 */
export const getEmployeeById = async (id: number): Promise<Employees> => {
    const findEmployee: Employees | undefined = employees.find((employee: Employees) => employee.id === id);

    if (!findEmployee){
        throw new Error (`Employee with ID ${id} does not exist`);
    }

    return structuredClone(findEmployee)
}

/**
 * Retrieves all employees belonging to a specific branch
 * @param branchId - The ID of the branch to filter employees by
 * @returns An array of the Employees that belong to the specified branch
 * @throws Error if the branch ID does not exist
 */
export const getAllEmployeesForABranch =  (branchId: number): Employees[] =>{

    // Check if any employee is associated to this branch ID

    const branchExists: boolean = employees.some((employee: Employees) => employee.branchId === branchId);
    
    if(!branchExists){
        throw new Error(`Branch ID ${branchId} not found.`);
    }
    
    // Filter employees that match the branch ID
    const foundEmployees: Employees []= employees.filter((employee: Employees) => employee.branchId === branchId);

    return structuredClone(foundEmployees)
}

/**
 * Retrieves all employees belonging to a specific department
 * @param departmentName - The department to filter employees by
 * @returns An array of the Employees that belong to the specified department
 * @throws Error if no employees are found in the given department
 */
export const getEmployeesByDepartment = (departmentName: string): Employees[] => {

    const departmentExists: boolean = employees.some((employee: Employees) => employee.department.toLowerCase() === departmentName.toLowerCase());

    if (!departmentExists) {
        throw new Error(`Department '${departmentName}' not found.`);
    }

    const foundEmployees: Employees[] = employees.filter((employee: Employees) => employee.department.toLowerCase() === departmentName.toLowerCase());

    return structuredClone(foundEmployees);
};