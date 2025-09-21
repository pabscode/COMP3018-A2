import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as branchesService from "../services/branchesService";
import { Branches } from "../models/branchesModel";

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
        res.status(HTTP_STATUS.OK).json({
            message: "Branch list returned successfully.",
            data: branches,
        })
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

        //Validation for required branch fields
        if (!req.body.name){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch name is required."
            })

        } else if (!req.body.address){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch address is required."
            })
        } else if (!req.body.phone){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch phone # is required."
            })
        } else {
            const {name, address, phone} = req.body;
            const newBranch: Branches = await branchesService.createBranch({name, address, phone});
                
            res.status(HTTP_STATUS.CREATED).json({
                message: "Branch has been created successfully.",
                data: newBranch
            });

        }

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
        const id: number = parseInt(req.params.id);

        const {name, address, phone} = req.body;

        // Updates branch object with the fields to be updated
        const updatedBranch = await branchesService.updateBranch(id, {
                name, 
                phone,
                address
        })
        res.status(HTTP_STATUS.OK).json({
            message: "Branch information updated successfully.",
            data: updatedBranch
        })

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
        const id: number = parseInt(req.params.id);

        await branchesService.deleteBranch(id);
        res.status(HTTP_STATUS.OK).json({
            message: "Branch deleted successfully",
        });
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

        const id: number = parseInt(req.params.id);

        const branch: Branches = await branchesService.getBranchById(id);

        res.status(HTTP_STATUS.OK).json({
            message: "Branch retrieved successfully.",
            data: branch,
        });
    } catch (error: unknown) {
        next(error);
    }
};
