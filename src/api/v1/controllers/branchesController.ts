import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as branchesService from "../services/branchesService";
import { Branches } from "../models/branchesModel";
import { successResponse } from "../models/responseModel";

/**
 * Manages requests and responses to retrieve all Branches
 * @param req - The express Request
 * @param res - The express Response
 * @param next = The express middleware chaining function
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try{
        const branches: Branches[] = await branchesService.getAllBranches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branches successfully retrieved")
        )
    }catch (error: unknown){
        next(error);
    }
};

/**
 * Manages requests, responses and validation to create a Branch
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */

export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try{
        const {name, address, phone} = req.body;
        const newBranch: Branches = await branchesService.createBranch({name, address, phone});
            
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newBranch, "Branch has been created successfully")
        );

    } catch (error: unknown){
        next(error);
    }
};

/**
 * Manages requests and responses to update a Branch
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */

export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try{
        const id: string = req.params.id;

        const {name, address, phone} = req.body;

        // Updates branch object with the fields to be updated
        const updatedBranch: Branches = await branchesService.updateBranch(id, {
                name, 
                phone,
                address
        })
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedBranch, "Branch information updated successfully")
        )

    } catch (error: unknown){
        next(error);
    }
}

/**
 * Manages requests and reponses to delete a Branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */

export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await branchesService.deleteBranch(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Branch deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve an Branch by ID
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const id: string = req.params.id;

        const branch: Branches = await branchesService.getBranchById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, "Branch retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};
