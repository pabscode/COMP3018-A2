import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { branchesSchema } from "../src/api/v1/validations/branchesValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";
import { HTTP_STATUS } from "src/api/v1/constants/httpConstants";

describe("Branch Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should pass validation for valid branch data", () => {
        // Arrange
        mockReq.body = {
            name: "Red River Branch",
            address: "2055 Notre Dame Ave",
            phone: "204-632-3960",
        };
        const middleware: MiddlewareFunction = validateRequest(
            branchesSchema.create
        );

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation when address is empty", () => {
        // Arrange
        mockReq.body = {
            name: "Red River Branch",
            address: "",
            phone: "204-632-3960",
        };
        const middleware: MiddlewareFunction = validateRequest(
            branchesSchema.create
        );

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Validation error: Body: Address cannot be empty",
        });
    });
});