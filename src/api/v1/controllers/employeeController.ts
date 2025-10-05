import { Request, Response, NextFunction, response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as employeeService from "../services/employeeService";
import { Employees } from "../models/employeeModel";
import { errorResponse, successResponse } from "../models/responseModel";

/**
 * Manages requests and responses to retrieve all Employees
 * @param req - The express Request
 * @param res - The express Response
 * @param next = The express middleware chaining function
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try{
        const employees: Employees[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employee list returned successfully")
        )
    }catch (error: unknown){
        next(error);
    }
};

/**
 * Manages requests, responses and validation to create an Employee
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try{
        const {name, position, department, email, phone, branchId} = req.body;
        const newEmployee: Employees = await employeeService.createEmployee({
            name,
            position,
            department,
            email,
            phone,
            branchId
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEmployee, "Employee has been created successfully")
        );
        
    }catch (error: unknown){
        next(error);
    }
};

/**
 * Manages requests and responses to update an Employee
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const id: string = req.params.id;

        const {name, position, department, email, phone, branchId} = req.body;
        
        // Updates the Employee object with the fields to be updated.
        const updatedEmployee: Employees = await employeeService.updateEmployee(id, {
            name, 
            position, 
            department, 
            email, 
            phone, 
            branchId
        })

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEmployee, "Employee information updated successfully")
        )

    }catch (error: unknown){
        next(error);
    }
}

/**
 * Manages requests and reponses to delete an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */

export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await employeeService.deleteEmployee(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Employee deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve an Employee by ID
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const employee: Employees = await employeeService.getEmployeeById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse("Employee retrieved successfully.")
        );
        
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve all employees from a specific branch
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllEmployeesForABranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const branchId: string = req.params.branchId;
        const employees: Employees[] = await employeeService.getAllEmployeesForABranch(branchId);

        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees for branch retrieved successfully")
        );

    }catch (error: unknown){
        next(error);
    }
}

/**
 * Manages requests and responses to retrieve all employees in a department
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const departmentName: string = req.params.departmentName;
        const employees: Employees[] = await employeeService.getEmployeesByDepartment(departmentName);

        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees in department retrieved successfully.")
        );

    }catch(error: unknown){
        next(error);
    }
}