import express, { Router } from "express";
import * as branchController from "../controllers/branchesController";
import { validateRequest } from "../middleware/validate";
import { branchesSchema } from "../validations/branchesValidation";

const router: Router = express.Router();

// "/api/v1/branches" prefixes all below routes
router.get("/", branchController.getAllBranches);
router.get("/:id", branchController.getBranchById);
router.post("/", validateRequest(branchesSchema.create), branchController.createBranch);
router.put("/:id", validateRequest(branchesSchema.create), branchController.updateBranch);
router.delete("/:id", branchController.deleteBranch);

export default router;