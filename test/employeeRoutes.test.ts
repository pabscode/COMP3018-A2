import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "src/api/v1/services/employeeService";
import { HTTP_STATUS } from "../src/api/v1/constants/httpConstants";
import { Employees } from "src/api/v1/models/employeeModel";

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    getAllEmployees: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeeById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

// Testing to see if the mapping is correct

describe("Employee Routes", () => {
    afterEach(() =>{
        jest.clearAllMocks();
    });

    describe("GET /api/v1/employee/", () => {
        it("should call getAllEmployees controller", async() => {
            await request(app).get("/api/v1/employee/")
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        })
    })

    describe("GET /api/v1/employee/:id", () => {
        it("should call getEmployeeById controller", async() => {
            const mockId = "67"

            await request(app).get(`/api/v1/employee/:${mockId}`)
            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        })
    })

    describe("POST /api/v1/employee/", () => {
        it("should call createEmployee controller with valid data", async() => {
            const mockEmployee: Omit <Employees, "id"> = {
                name: "Test Employee",
                position: "Test position",
                department: "Test department",
                email: "Test email",
                phone: "Test phone",
                branchId: 2
            }
            await request(app).post("/api/v1/employee/").send(mockEmployee);
            expect(employeeController.createEmployee).toHaveBeenCalled();
        })
    })

    describe("PUT /api/v1/employee/:id", () => {
        it("should call updateEmployee controller with valid data", async () => {
            const mockEmployee = {
                phone: "Updated phone number",
                email: "Updated email",
            }; 

            await request(app).put("/api/v1/employee/testId").send(mockEmployee);
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    })

    describe("DELETE /api/v1/employee/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/employee/testId");
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });
})