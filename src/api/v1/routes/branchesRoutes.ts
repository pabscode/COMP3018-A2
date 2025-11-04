import express, { Router } from "express";
import * as branchController from "../controllers/branchesController";
import { validateRequest } from "../middleware/validate";
import { branchesSchema } from "../validations/branchesValidation";

const router: Router = express.Router();

// "/api/v1/branches" prefixes all below routes
/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieves a list of branches
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: 
 *         description: A list of Branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", branchController.getAllBranches);
/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Retrieves a single branch by ID
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *         example: "wl3jQESZeHi6QNDnpbJO"
 *     responses:
 *       200:
 *         description: Branch details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
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
 */
router.get("/:id", validateRequest(branchesSchema.getById), branchController.getBranchById);
router.post("/", validateRequest(branchesSchema.create), branchController.createBranch);
router.put("/:id", validateRequest(branchesSchema.update), branchController.updateBranch);
router.delete("/:id", validateRequest(branchesSchema.delete), branchController.deleteBranch);

export default router;