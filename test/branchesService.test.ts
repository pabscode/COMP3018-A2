import * as branchesService from "../src/api/v1/services/branchesService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Branches } from "../src/api/v1/models/branchesModel";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Branches Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a branch successfully", async () => {
        // Arrange
        const mockBranchData = {
            name: "Downtown Branch",
            address: "123 Main St, Winnipeg, MB",
            phone: "204-555-0100"
        };
        const mockDocumentId: string = "test-branch-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

        // Act
        const result: Branches = await branchesService.createBranch(mockBranchData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith("branches", mockBranchData);
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockBranchData.name);
    });

    it("should get branch by id successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-branch-id";
        const mockBranchData = {
            name: "Downtown Branch",
            address: "123 Main St, Winnipeg, MB",
            phone: "204-555-0100"
        };

        const mockDoc = {
            id: mockDocumentId,
            exists: true,
            data: () => mockBranchData
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

        // Act
        const result: Branches = await branchesService.getBranchById(mockDocumentId);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("branches", mockDocumentId);
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockBranchData.name);
    });

    it("should update a branch successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-branch-id";
        const existingBranch = {
            name: "Downtown Branch",
            address: "123 Main St, Winnipeg, MB",
            phone: "204-555-0100"
        };

        const mockDoc = {
            id: mockDocumentId,
            exists: true,
            data: () => existingBranch
        };

        const updateData = {
            name: "Updated Downtown Branch",
            address: "456 New St, Winnipeg, MB",
            phone: "204-555-0200"
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result: Branches = await branchesService.updateBranch(mockDocumentId, updateData);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("branches", mockDocumentId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith("branches", mockDocumentId, expect.objectContaining({
            name: "Updated Downtown Branch",
            address: "456 New St, Winnipeg, MB"
        }));
        expect(result.name).toBe("Updated Downtown Branch");
    });

    it("should delete a branch successfully", async () => {
        // Arrange
        const mockDocumentId: string = "test-branch-id";
        const mockBranch: Branches = {
            id: mockDocumentId,
            name: "Downtown Branch",
            address: "123 Main St, Winnipeg, MB",
            phone: "204-555-0100"
        };

        jest.spyOn(branchesService, "getBranchById").mockResolvedValue(mockBranch);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await branchesService.deleteBranch(mockDocumentId);

        // Assert
        expect(branchesService.getBranchById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("branches", mockDocumentId);
    });
});