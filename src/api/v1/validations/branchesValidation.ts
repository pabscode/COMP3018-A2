import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the branch
 *           example: "wl3jQESZeHi6QNDnpbJO"
 *         name:
 *           type: string
 *           description: Name of the branch
 *           example: "Winnipeg Branch"
 *         address:
 *           type: string
 *           description: Branch address
 *           example: "1300 Joe St, Winnipeg, MB, R2X 4M5"
 *         phone:
 *           type: string
 *           description: Branch phone number
 *           example: "204-456-0022"
 */

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
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
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

    // GET /api/v1/branches/:id - Get Branch by ID
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
    },

    // DELETE /api/v1/branches/:id - Delete Branch
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
    },
};