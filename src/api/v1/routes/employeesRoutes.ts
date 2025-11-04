import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../validations/employeeValidation";


const router: Router = express.Router();

// "/api/v1/employee" prefixes all below routes
/**
 * @openapi
 * /employee:
 *   get:
 *     summary: Retrieves a list of employees
 *     tags:
 *       - Employee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: 
 *         description: A list of Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", employeeController.getAllEmployees);
router.get("/:id", validateRequest(employeeSchema.getById), employeeController.getEmployeeById)
router.get("/branch/:branchId", validateRequest(employeeSchema.getByBranch), employeeController.getAllEmployeesForABranch);
router.get("/department/:departmentName", validateRequest(employeeSchema.getByDepartment), employeeController.getEmployeesByDepartment);
router.post("/", validateRequest(employeeSchema.create), employeeController.createEmployee);
router.put("/:id", validateRequest(employeeSchema.update), employeeController.updateEmployee);
router.delete("/:id", validateRequest(employeeSchema.delete), employeeController.deleteEmployee);

export default router;