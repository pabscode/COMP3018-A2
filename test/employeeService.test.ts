import * as employeeService from "../src/api/v1/services/employeeService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Employees } from "../src/api/v1/models/employeeModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an employee successfully", async () => {

        const mockEmployeeData = {
            name: "Amandeep Singh", 
            position: "Customer Service Representative", 
            department: "Customer Service", 
            email: "amandeep.singh@pixell-river.com", 
            phone: "780-555-0172", 
            branchId: "2" 
        };
        const mockDocumentId: string = "test-employee-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

        // Act
        const result: Employees = await employeeService.createEmployee(mockEmployeeData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith("employees", mockEmployeeData);
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEmployeeData.name);
    });

    it("should get employee by id successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-employee-id";
        const mockEmployeeData = {
            name: "Amandeep Singh", 
            position: "Customer Service Representative", 
            department: "Customer Service", 
            email: "amandeep.singh@pixell-river.com", 
            phone: "780-555-0172", 
            branchId: "2" 
        };

        const mockDoc = {
            id: mockDocumentId,
            exists: true,
            data: () => mockEmployeeData
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

        // Act
        const result: Employees = await employeeService.getEmployeeById(mockDocumentId);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("employees", mockDocumentId);
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEmployeeData.name);
    });

    it("should update an employee successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-employee-id";
        const existingEmployee = {
            name: "Amandeep Singh", 
            position: "Customer Service Representative", 
            department: "Customer Service", 
            email: "amandeep.singh@pixell-river.com", 
            phone: "780-555-0172", 
            branchId: "2" 
        };

        const mockDoc = {
            id: mockDocumentId,
            exists: true,
            data: () => existingEmployee
        };

        const updateData = {
            name: "Amandeep Singh", 
            position: "Customer Service Manager", 
            department: "Customer Service", 
            email: "amandeep.singh@pixell-river.com", 
            phone: "780-555-0172", 
            branchId: "2" 
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result: Employees = await employeeService.updateEmployee(mockDocumentId, updateData);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("employees", mockDocumentId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith("employees", mockDocumentId, expect.objectContaining({
            position: "Customer Service Manager", 
        }));
        expect(result.name).toBe("Amandeep Singh");
    });

    it("should delete an employee successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-employee-id";
        const mockEmployee: Employees = {
            id: mockDocumentId,
            name: "Amandeep Singh", 
            position: "Customer Service Representative", 
            department: "Customer Service", 
            email: "amandeep.singh@pixell-river.com", 
            phone: "780-555-0172", 
            branchId: "2" 
        };

        jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployee);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await employeeService.deleteEmployee(mockDocumentId);

        // Assert
        expect(employeeService.getEmployeeById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("employees", mockDocumentId);
    });

    it("should get all employees for a branch successfully", async () => {
        // Arrange
        const mockEmployees = [
            {
                name: "Sarah King", 
                position: "Customer Service Supervisor", 
                department: "Customer Service", 
                email: "sarah.king@pixell-river.com", 
                phone: "506-555-0336", 
                branchId: "branch1" 
            },
            {
                name: "Amandeep Singh", 
                position: "Customer Service Representative", 
                department: "Customer Service", 
                email: "amandeep.singh@pixell-river.com", 
                phone: "780-555-0172", 
                branchId: "branch1" 
            }
        ];

        const mockSnapshot = {
            docs: [
                { id: "1", data: () => mockEmployees[0] },
                { id: "2", data: () => mockEmployees[1] }
            ]
        };

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        // Act
        const result: Employees[] = await employeeService.getAllEmployeesForABranch("branch1");

        // Assert
        expect(result).toHaveLength(2);
        expect(result[0].branchId).toBe("branch1");
        expect(result[1].branchId).toBe("branch1");
    });

    it("should get employees by department successfully", async () => {
        // Arrange
        const mockEmployees = [
            {
                name: "Sarah King", 
                position: "Customer Service Supervisor", 
                department: "Customer Service", 
                email: "sarah.king@pixell-river.com", 
                phone: "506-555-0336", 
                branchId: "branch1" 
            },
            {
                name: "Amandeep Singh", 
                position: "Customer Service Representative", 
                department: "Customer Service", 
                email: "amandeep.singh@pixell-river.com", 
                phone: "780-555-0172", 
                branchId: "branch1" 
            }
        ];

        const mockSnapshot = {
            docs: [
                { id: "1", data: () => mockEmployees[0] },
                { id: "2", data: () => mockEmployees[1] }
            ]
        };

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        // Act
        const result: Employees[] = await employeeService.getEmployeesByDepartment("Customer Service");

        // Assert
        expect(result).toHaveLength(2);
        expect(result[0].department).toBe("Customer Service");
        expect(result[1].department).toBe("Customer Service");
    });
});