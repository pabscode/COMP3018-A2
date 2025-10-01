import Joi from "joi";

/**
 * Branches Schema organised by request type
 */
export const branchesSchema = {
    // POST /api/v1/branches - Create New Branch
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty",
            }),
            phone: Joi.string().required().messages({
                "any.required": "Phone is required",
                "string.empty": "Phone number cannot be empty",
            }),
        }),
    },

    // PUT /api/v1/branches/:id - Update Branch
    update: {
        params: Joi.object({
            id: Joi.number().required().messages({
                "any.required": "Branch ID is required",
                "number.base": "Branch ID must be a number",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot empty",
            }),
            address: Joi.string().optional().messages({
                "string.empty": "Address cannot be empty",
            }),
            phone: Joi.string().optional().messages({
                "string.empty": "Phone number cannot be empty",
            }),
        }),
    },
};