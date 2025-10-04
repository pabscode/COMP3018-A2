import { DocumentData, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { Employees } from "../models/employeeModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// reference to the firestore collection
const COLLECTION: string = "employees";

/**
 * Retrieves all employees 
 * @returns Array of employees
 */
export const getAllEmployees = async (): Promise<Employees[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const employees: Employees[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Employees;
        });
        return employees;
    } catch (error) {
        throw(error);
    }
}

/**
 * Creates a new employee
 * @param employeeData - The data for the new employee including:
 *      - name (string)
 *      - position (string)
 *      - department (string)
 *      - email (string)
 *      - phone (string)
 *      - branchId (string)
 * @returns The new employee with a generated ID.
 */
export const createEmployee = async (employeeData: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string; 
}): Promise<Employees> => {
    try{
        const newEmployee: Partial<Employees> ={
            ...employeeData
        };

        const employeeId: string = await createDocument(COLLECTION, newEmployee);
        
        return structuredClone({ id: employeeId, ...newEmployee } as Employees);
    } catch (error: unknown) {
        throw error;
    }

};

/**
 * Updates (replaces) an existing employee
 * @param id - The ID of the employee to update
 * @param employeeData - The fields to update (name, position, department, email, phone, and/or branchId)
 * @returns The updated employee
 * @throws Error if employee with given ID is not found
 */
export const updateEmployee = async (
    id: string,
    employeeData: Pick<Employees, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise<Employees> => {
    // check if the employee exists before updating
    const employee: Employees = await getEmployeeById(id);
    if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const updatedEmployee: Employees = {
        ...employee,
    };

    if (employeeData.name !== undefined) updatedEmployee.name = employeeData.name;
    if (employeeData.position !== undefined) updatedEmployee.position = employeeData.position;
    if (employeeData.department !== undefined) updatedEmployee.department = employeeData.department;
    if (employeeData.email !== undefined) updatedEmployee.email = employeeData.email;
    if (employeeData.phone !== undefined) updatedEmployee.phone = employeeData.phone;
    if (employeeData.branchId !== undefined) updatedEmployee.branchId = employeeData.branchId;

    await updateDocument<Employees>(COLLECTION, id, updatedEmployee);

    return structuredClone(updatedEmployee);
};

/**
 * Deletes an employee from Firestore
 * @param id - The ID of the employee to be deleted 
 * @throws - Error if employee with ID is not found
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const employee: Employees = await getEmployeeById(id);

    if (!employee){
        throw new Error (`Employee with ID ${id} does not exist`);
    }

    await deleteDocument(COLLECTION, id);
}

/**
 * Gets a single Employee by ID
 * @param id - The ID of the Employee to return
 * @returns The Employee information with the matching ID
 * @throws Error if the employee ID does not exist
 */
export const getEmployeeById = async (id: string): Promise<Employees> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if(!doc || !doc.exists){
        throw new Error (`Employee with ID ${id} does not exist`);
    }

    const data: DocumentData | undefined = doc.data();
    const employee: Employees = {
        id: doc.id,
        ...data,
    } as Employees;

    return structuredClone(employee);
}

/**
 * Retrieves all employees belonging to a specific branch
 * @param branchId - The ID of the branch to filter employees by
 * @returns An array of the Employees that belong to the specified branch
 * @throws Error if no employees are found for the branch ID
 */
export const getAllEmployeesForABranch = async (branchId: string): Promise<Employees[]> => {
    // Get all employees from Firestore
    const allEmployees: Employees[] = await getAllEmployees();

    // Filter employees that match the branch ID
    const foundEmployees: Employees[] = allEmployees.filter(
        (employee: Employees) => employee.branchId === branchId
    );
    
    if(foundEmployees.length === 0){
        throw new Error(`No employees found for branch ID ${branchId}.`);
    }

    return structuredClone(foundEmployees);
}

/**
 * Retrieves all employees belonging to a specific department
 * @param departmentName - The department to filter employees by
 * @returns An array of the Employees that belong to the specified department
 * @throws Error if no employees are found in the given department
 */
export const getEmployeesByDepartment = async (departmentName: string): Promise<Employees[]> => {
    const allEmployees: Employees[] = await getAllEmployees();

    const foundEmployees: Employees[] = allEmployees.filter(
        (employee: Employees) => employee.department.toLowerCase() === departmentName.toLowerCase()
    );

    if (foundEmployees.length === 0) {
        throw new Error(`No employees found in department '${departmentName}'.`);
    }
    return structuredClone(foundEmployees);
};