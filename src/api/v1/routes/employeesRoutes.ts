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
 *     tags: [Employee]
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
/**
 * @openapi
 * /employee/{id}:
 *   get:
 *     summary: Retrieves a single employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *         example: "HC3mXN6Dxyg4eaSjhBxY"
 *     responses:
 *       201:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee not found"
 *       400:
 *         description: Missing employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee ID is required"
 */
router.get("/:id", validateRequest(employeeSchema.getById), employeeController.getEmployeeById)
/**
 * @openapi
 * /employee/branch/{branchId}:
 *   get:
 *     summary: Retrieves all employees for a specific branch
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *         example: "6"
 *     responses:
 *       200:
 *         description: A list of employees for the specified branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *             example: 
 *               - id: "HC3mXN6Dxyg4eaSjhBxY"
 *                 name: "John Black"
 *                 position: "Branch Manager"
 *                 department: "Management"
 *                 email: "john.black@pixell-river.com"
 *                 phone: "204-555-04667"
 *                 branchId: "6"
 *               - id: "ABC123XYZ456"
 *                 name: "Sarah Johnson"
 *                 position: "Senior Developer"
 *                 department: "Engineering"
 *                 email: "sarah.johnson@pixell-river.com"
 *                 phone: "204-555-01234"
 *                 branchId: "6"
 *       404:
 *         description: Branch not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Branch not found"
 *       400:
 *         description: Invalid branch ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Branch ID is required"
 */
router.get("/branch/:branchId", validateRequest(employeeSchema.getByBranch), employeeController.getAllEmployeesForABranch);
/**
 * @openapi
 * /employee/department/:departmentName:
 *   get:
 *     summary: Retrieves all employees for a specific department
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: The department name
 *         example: "Management"
 *     responses:
 *       200:
 *         description: A list of employees for the specified Department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Department not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Department not found"
 *       400:
 *         description: Invalid Department Name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Department Name is required"
 */
router.get("/department/:departmentName", validateRequest(employeeSchema.getByDepartment), employeeController.getEmployeesByDepartment);
/**
 * @openapi
 * /employee:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - phone
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Black"
 *               position:
 *                 type: string
 *                 example: "Branch Manager"
 *               department:
 *                 type: string
 *                 example: "Management"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.black@pixell-river.com"
 *               phone:
 *                 type: string
 *                 example: "204-555-04667"
 *               branchId:
 *                 type: string
 *                 example: "6"
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Name is required"
 */
router.post("/", validateRequest(employeeSchema.create), employeeController.createEmployee);
/**
 * @openapi
 * /employee/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *         example: "HC3mXN6Dxyg4eaSjhBxY"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Gray"
 *               position:
 *                 type: string
 *                 example: "Branch Manager"
 *               department:
 *                 type: string
 *                 example: "Management"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.black@pixell-river.com"
 *               phone:
 *                 type: string
 *                 example: "204-555-04667"
 *               branchId:
 *                 type: string
 *                 example: "6"
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee ID is required"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee not found"
 */
router.put("/:id", validateRequest(employeeSchema.update), employeeController.updateEmployee);
/**
 * @openapi
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *         example: "HC3mXN6Dxyg4eaSjhBxY"
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee deleted successfully"
 *       400:
 *         description: Invalid employee ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee ID is required"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee not found"
 */
router.delete("/:id", validateRequest(employeeSchema.delete), employeeController.deleteEmployee);

export default router;