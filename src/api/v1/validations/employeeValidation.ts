import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the employee
 *           example: "HC3mXN6Dxyg4eaSjhBxY"
 *         name:
 *           type: string
 *           description: Full name of the employee
 *           example: "John Black"
 *         position:
 *           type: string
 *           description: Job position or title of the employee
 *           example: "Branch Manager"
 *         department:
 *           type: string
 *           description: Department where the employee works
 *           example: "Management"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee's email address
 *           example: "john.black@pixell-river.com"
 *         phone:
 *           type: string
 *           description: Employee's phone number
 *           example: "204-555-04667"
 *         branchId:
 *           type: string
 *           description: Identifier for the branch where employee is located
 *           example: "6"
*/

/**
 * Employee Schema organised by request type
 */
export const employeeSchema: Record<string, RequestSchema> = {
    // POST /api/v1/employee - Create New Employee
    create: { 
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty",
            }),
            department: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),
            email: Joi.string().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty", 
                "string.email": "Email must be valid",
            }),
            phone: Joi.string().required().messages({
                "any.required": "Phone is required",
                "string.empty": "Phone cannot be empty", 
            }),
            branchId: Joi.string().required().messages({
                "any.required": "branchId is required",
                "string.empty": "BranchId cannot be empty", 
            }),
        }),
    },

    // PUT /api/v1/employee/:id - Update Employee
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().optional().messages({
                "string.empty": "Position cannot be empty",
            }),
            department: Joi.string().optional().messages({
                "string.empty": "Department cannot be empty",
            }),
            email: Joi.string().optional().messages({
                "string.empty": "Email cannot be empty", 
                "string.email": "Email must be valid",
            }),
            phone: Joi.string().optional().messages({
                "string.empty": "Phone cannot be empty", 
            }),
            branchId: Joi.string().optional().messages({
                "string.empty": "BranchId cannot be empty", 
            }),
        })
    },

    // GET /api/v1/employee/:id - Get Employee by ID
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }),
    },

    // DELETE /api/v1/employee/:id - Delete Employee
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }),
    },

    // GET /api/v1/employee/branch/:branchId - Get Employees by Branch
    getByBranch: {
        params: Joi.object({
            branchId: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
    },

    // GET /api/v1/employee/department/:departmentName - Get Employees by Department
    getByDepartment: {
        params: Joi.object({
            departmentName: Joi.string().required().messages({
                "any.required": "Department name is required",
                "string.empty": "Department name cannot be empty",
            }),
        }),
    },
}