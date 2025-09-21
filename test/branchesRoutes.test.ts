import request from "supertest";
import app from "../src/app";
import * as branchesController from "../src/api/v1/controllers/branchesController";
import { HTTP_STATUS } from "../src/api/v1/constants/httpConstants";
import { Branches } from "src/api/v1/models/branchesModel";

jest.mock("../src/api/v1/controllers/branchesController", () => ({
    getAllBranches: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getBranchById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createBranch: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/branches/", () => {
        it("should call getAllBranches controller", async () => {
            await request(app).get("/api/v1/branches/");
            expect(branchesController.getAllBranches).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branches/:id", () => {
        it("should call getBranchById controller", async () => {
            const mockId: string = "10";
            await request(app).get(`/api/v1/branches/${mockId}`);
            expect(branchesController.getBranchById).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/branches/", () => {
        it("should call createBranch controller with valid data", async () => {
            const mockBranch: Omit<Branches, "id"> = {
                name: "Test Branch",
                address: "Test Address",
                phone: "Test Phone #"
            };
            await request(app).post("/api/v1/branches/").send(mockBranch);
            expect(branchesController.createBranch).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranch controller with valid data", async () => {
            const mockBranchUpdate: Object = {
                name: "Updated Branch",
                address: "Updated Street",
                phone: "Updated Phone #",
            };
            await request(app).put("/api/v1/branches/testId").send(mockBranchUpdate);
            expect(branchesController.updateBranch).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller", async () => {
            await request(app).delete("/api/v1/branches/testId");
            expect(branchesController.deleteBranch).toHaveBeenCalled();
        });
    });
});
