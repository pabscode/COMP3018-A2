import express, { Router } from "express";
import * as branchController from "../controllers/branchesController";
import { validateRequest } from "../middleware/validate";
import { branchesSchema } from "../validations/branchesValidation";

const router: Router = express.Router();

// "/api/v1/branches" prefixes all below routes
router.get("/", branchController.getAllBranches);
router.get("/:id", validateRequest(branchesSchema.getById), branchController.getBranchById);
router.post("/", validateRequest(branchesSchema.create), branchController.createBranch);
router.put("/:id", validateRequest(branchesSchema.update), branchController.updateBranch);
router.delete("/:id", validateRequest(branchesSchema.delete), branchController.deleteBranch);

export default router;