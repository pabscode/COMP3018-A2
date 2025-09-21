import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

// "/api/v1/employee" prefixes all below routes
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById)
router.get("/branch/:branchId", employeeController.getAllEmployeesForABranch)
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;