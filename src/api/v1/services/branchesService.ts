import { DocumentData, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { Branches } from "../models/branchesModel";
import { branchesData } from "src/data/branches";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";
import { error } from "console";

const COLLECTION: string = "branches";

/**
 * Retrieves all branches
 * @returns Array of all branches
 */
export const getAllBranches = async (): Promise<Branches[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const branches: Branches[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Branches;
        });
        return branches;
    } catch (error) {
        throw(error);
    }
}

/**
 * Creates a new branch
 * @param branchData - The data for the new branch including:
 *      - name (string)
 *      - address (string)
 *      - phone (string)
 * @returns The new branch with generated ID.
 */
export const createBranch = async (branchData: {
    name: string;
    address: string;
    phone: string;
}): Promise<Branches> => {
    try {
        const newBranch: Partial<Branches> = {
            ...branchData
        };

        const branchId: string = await createDocument(COLLECTION, newBranch);

        return structuredClone({ id: branchId, ...newBranch } as Branches);
    } catch (error: unknown) {
        throw error;
    }
}


/**
 * @param id - The id of the branch to be updated
 * @param branchData - The fields to update:
 *      - name (string)
 *      - address (string)
 *      - phone (string)
 * @returns The branch with updated fields
 * @throws Error if ID associated with branch does not exist
 */
export const updateBranch = async (
    id: string,
    branchData: Pick<Branches, "name" | "address" | "phone"> 
): Promise <Branches> =>{
    
    const branch: Branches = await getBranchById(id);
    if (!branch){
        throw new Error(`Employee with ID ${id} does not exist`);
    }

    const updatedBranch: Branches = {
        ...branch,
    };

    if (branchData.name !== undefined) updatedBranch.name = branchData.name;
    if (branchData.address !== undefined) updatedBranch.address = branchData.address;
    if (branchData.phone !== undefined) updatedBranch.phone = branchData.phone;

    await updateDocument<Branches>(COLLECTION, id, updatedBranch);

    return structuredClone(updatedBranch);
}

/**
 * Deletes a branch from the array
 * @param id The id of the branch to be deleted
 * @throws Error if ID of the branch does not exist
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const branch: Branches = await getBranchById(id);

    if(!branch){
        throw new Error(`Branch with ID ${id} does not exist`);
    }

    await deleteDocument(COLLECTION, id);
 
}

/**
 * Gets a single branch by ID
 * @param id - The ID of the branch to return
 * @returns The Branch information with the matching ID
 * @throws Error if the branch ID does not exist
 */
export const getBranchById = async (id: string): Promise<Branches> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if(!doc || !doc.exists){
        throw new Error(`Branch with ID ${id} does not exist`);
    }

    const data: DocumentData | undefined = doc.data();
    const branch: Branches = {
        id: doc.id,
        ...data,
    } as Branches;
    
    return structuredClone(branch);
}