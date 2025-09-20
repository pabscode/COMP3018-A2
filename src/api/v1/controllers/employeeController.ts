import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as employeeService from "../services/employeeService";
import { Employees } from "../models/employeeModel";
import { REPLCommand } from "repl";

/**
 * Manages requests and resposnses to retrieve all employees
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
        res.status(HTTP_STATUS.OK).json({
            message: "Employee list returned successfully.",
            data: employees,
        })
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
        // Validation for required Employee fields.
        if (!req.body.name){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee name is required."
            })

        } else if (!req.body.position){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee position is required."
            })

        } else if (!req.body.department){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee department is required."
            })
        } else if (!req.body.email){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee email is required."
            })
        } else if (!req.body.phone){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee phone is required."
            })
        } else if (!req.body.branchId){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee branch ID is required."
            })
        } else {
            const {name, position, department, email, phone, branchId} = req.body;
            const newEmployee: Employees = await employeeService.createEmployee({
                name,
                position,
                department,
                email,
                phone,
                branchId
            });

            res.status(HTTP_STATUS.CREATED).json({
                message: "Employee has been created successfully",
                data: newEmployee
            });
        } 
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
        const { id } = req.params;

        const {name, position, department, email, phone, branchId} = req.body;
        
        // Updates the Employee object with the fields to be updated.
        const updatedEmployee = await employeeService.updateEmployee(Number(id), {
            name, 
            position, 
            department, 
            email, 
            phone, 
            branchId
        })

        res.status(HTTP_STATUS.OK).json({
            message: "Employee information updated successfully.",
            data: updatedEmployee
        })

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

export const deleteItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;
        
        await employeeService.deleteEmployee(Number(id));
        res.status(HTTP_STATUS.OK).json({
            message: "Employee deleted successfully",
        });
    } catch (error: unknown) {
        next(error);
    }
};