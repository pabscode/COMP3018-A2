import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/api/v1/constants/httpConstants";
import * as branchesController from "../src/api/v1/controllers/branchesController";
import * as branchesService from "../src/api/v1/services/branchesService";
import { Branches } from "src/api/v1/models/branchesModel";

jest.mock("../src/api/v1/services/branchesService");

describe("Branches Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("createBranch", () => {
        it("should handle successful creation", async () => {
            const mockBranch: Omit<Branches, "id"> = {
                name: "Test Branch",
                address: "Test Street",
                phone: "Test phone",
            };

            const createdBranch: Branches = { 
                id: "1", 
                ...mockBranch 
            };

            mockReq.body = mockBranch;
            (branchesService.createBranch as jest.Mock).mockResolvedValue(createdBranch);

            await branchesController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "Branch has been created successfully",
                data: createdBranch,
            });
        });
    });
    
    describe("getAllBranches", () => {
        it("should handle successful operation", async () => {
            const mockBranches: Branches[] = [
                { 
                    id: "1", 
                    name: "Test branch", 
                    address: "Test address",
                    phone: "Test phone"

                },
            ];
            (branchesService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);

            await branchesController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "Branches successfully retrieved",
                data: mockBranches,
            });
        });
        it("should handle error if list cannot be retrieved", async () => {
            const error: Error = new Error("Failed to retrieve branches");
            (branchesService.getAllBranches as jest.Mock).mockRejectedValue(error);

            await branchesController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe("getBranchById", () => {
        it("should handle a succesful retrieval", async ()=>{
            const mockBranch: Branches = {
                    id: "1", 
                    name: "Test branch", 
                    address: "Test address",
                    phone: "Test phone"
            };

            (branchesService.getBranchById as jest.Mock).mockResolvedValue(mockBranch);

            mockReq.params = { id: "1" };

            await branchesController.getBranchById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(branchesService.getBranchById).toHaveBeenCalledWith("1");
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                data: mockBranch,
                message: "Branch retrieved successfully",
            });
        })

        it("should handle errors for invalid branch ID", async () => {
            const error: Error = new Error("Branch ID 6 does not exist");
            (branchesService.getBranchById as jest.Mock).mockRejectedValue(error);

            mockReq.params = { id: "6" };

            await branchesController.getBranchById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(branchesService.getBranchById).toHaveBeenCalledWith("6");
            expect(mockNext).toHaveBeenCalledWith(error);
            });
        });
    describe("updateBranch", () => {
        it("should handle a successful update", async ()=>{
            mockReq.params = { id: "1"};
            mockReq.body = {
                name: "Updated branch", 
                address: "Updated address",
                phone: "Updated phone"
            };
            
            const updatedBranch: Branches = {
                id: "1",
                ...mockReq.body
            };

            (branchesService.updateBranch as jest.Mock).mockResolvedValue(updatedBranch);

            await branchesController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(branchesService.updateBranch).toHaveBeenCalledWith("1", mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "Branch information updated successfully",
                data: updatedBranch
                });

        })
    })

    describe("deleteBranch", () => {
        it("should handle a successful deletion", async () =>{
            mockReq.params = { id: "1" };
            (branchesService.deleteBranch as jest.Mock).mockResolvedValue(undefined);

            await branchesController.deleteBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(branchesService.deleteBranch).toHaveBeenCalledWith("1");
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                data: "Branch deleted successfully",
                });
        })
        it("should handle invalid ID", async () => {
            const error: Error = new Error("Branch with ID 88 does not exist");
            (branchesService.deleteBranch as jest.Mock).mockRejectedValue(error);

            mockReq.params = { id: "88" };

            await branchesController.deleteBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(branchesService.deleteBranch).toHaveBeenCalledWith("88");
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    })

});