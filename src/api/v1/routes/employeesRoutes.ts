import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../validations/employeeValidation";


const router: Router = express.Router();

// "/api/v1/employee" prefixes all below routes
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById)
router.get("/branch/:branchId", employeeController.getAllEmployeesForABranch);
router.get("/department/:departmentName", employeeController.getEmployeesByDepartment);
router.post("/", validateRequest(employeeSchema.create), employeeController.createEmployee);
router.put("/:id", validateRequest(employeeSchema.update), employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;