import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/api/v1/constants/httpConstants";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employees } from "src/api/v1/models/employeeModel";
import { Mock } from "node:test";

jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    // reusable mocks for any controller tests
    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });
    
    describe("createEmployee", () => {
        it("should handle successful creation", async () => {
            const mockEmployee: Omit <Employees, "id"> = {
                name: "Test Employee",
                position: "Test position",
                department: "Test department",
                email: "Test email",
                phone: "Test phone",
                branchId: 1
            }

            const createdEmployee: Employees = {
                id: 1,
                ...mockEmployee
            }

            mockReq.body = mockEmployee;
            (employeeService.createEmployee as jest.Mock).mockReturnValue(createdEmployee);

            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee has been created successfully",
                data: createdEmployee,
            })
        })

        //Test for createEmployee with missing parameters
        it("should return 400 when email is missing", async () => {
            mockReq.body = {
                name: "Test Employee",
                position: "Test position",
                // missing email requirement
                department: "Test department",
                phone: "Test phone",
                branchId: 1
            };

            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee email is required.",
            });
        })
    })
    
    describe("getAllEmployees", () => {
        it("should handle successful operation", async () => {
            const mockEmployees: Employees[] = [
                { 
                    id: 1,
                    name: "Test employee",
                    position: "Test position",
                    department: "Test department",
                    email: "Test email",
                    phone: "Test phone",
                    branchId: 1
                },
            ];
            (employeeService.getAllEmployees as jest.Mock).mockReturnValue(mockEmployees);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
                        
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee list returned successfully.",
                data: mockEmployees,
            });
        })

        it("should handle the error if the list cannot be retrieved", async () => {
            const error = new Error("Employee list was not retrieved.");
            (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(error);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
            });

        })
    
    describe("getEmployeeById", () => {
        it("should handle a successful retrieval", async () => {
            const mockEmployee: Employees = {
                id: 1,
                name: "Test Employee",
                position: "Test Position",
                department: "Test Department",
                email: "Test email",
                phone: "Test phone",
                branchId: 1
            };

            (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);

            mockReq.params = { id: "1" };

            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.getEmployeeById).toHaveBeenCalledWith(1);
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee retrieved successfully.",
                data: mockEmployee
            });
        });

        it("should handle errors for invalid employee ID", async () => {
            const error = new Error("Employee ID 2 does not exist");
            (employeeService.getEmployeeById as jest.Mock).mockRejectedValue(error);

            mockReq.params = { id: "2" };

            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.getEmployeeById).toHaveBeenCalledWith(2);
            expect(mockNext).toHaveBeenCalledWith(error);
            });
        });

    describe("updateEmployee", () => {
        it("should handle a successful update", async () => {
            mockReq.params = { id: "1" };
            mockReq.body = {
                name: "Updated Employee",
                position: "Updated Position",
                department: "Updated Department",
                email: "Update email",
                phone: "Updated phone",
                branchId: 2
            };

            const updatedEmployee: Employees = {
                id: 1,
                ...mockReq.body
            };

            (employeeService.updateEmployee as jest.Mock).mockResolvedValue(updatedEmployee);

            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.updateEmployee).toHaveBeenCalledWith(1, mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee information updated successfully.",
                data: updatedEmployee
                });
            });
        });


    describe("deleteEmployee", () => {
        it("should handle a successful deletion", async () =>{
            mockReq.params = { id: "1" };
            (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(undefined);

            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.deleteEmployee).toHaveBeenCalledWith(1);
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee deleted successfully",
                });
        })
        it("should handle invalid ID", async () => {
            const error = new Error("Employee with ID 67 does not exist");
            (employeeService.deleteEmployee as jest.Mock).mockRejectedValue(error);

            mockReq.params = { id: "67" };

            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.deleteEmployee).toHaveBeenCalledWith(67);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    })
});