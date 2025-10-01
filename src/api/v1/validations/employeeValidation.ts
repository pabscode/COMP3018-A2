import Joi, { ObjectSchema } from "joi";

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
                "string.empty": "branchId cannot be empty", 
            }),
        }),
    },

    // PUT /api/v1/employee/:id - Update Employee
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.required": "Employee ID cannot empty",
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
                "string.empty": "branchId cannot be empty", 
            }),
        })
    }
}