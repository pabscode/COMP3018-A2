import Joi from "joi";

/**
 * Employee Schema organised by request type
 */
export const employeeSchema = {
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