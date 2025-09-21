import express, { Router } from "express";
import * as branchController from "../controllers/branchesController";

const router: Router = express.Router();

// "/api/v1/branches" prefixes all below routes
router.get("/", branchController.getAllBranches);
router.get("/:id", branchController.getBranchById);
router.post("/", branchController.createBranch);
router.put("/:id", branchController.updateBranch);
router.delete("/:id", branchController.deleteBranch);

export default router;