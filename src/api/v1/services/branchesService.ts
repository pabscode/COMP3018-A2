import { Branches} from "src/data/branches";

const branch: Branches[] = [];

/**
 * Retrieves all branches
 * @returns Array of all branches
 */
export const getAllBranches = async (): Promise<Branches[]> => {
    return structuredClone(branch)
}

/**
 * Creates a new branch
 * @param branchData - The data for the new branch including:
 *      - name (string)
 *      - address (string)
 *      - phone (string)
 * @returns The new branch with generated ID.
 */
export const createBranch = async (branchData:{ 
    name: string;
    address: string;
    phone: string;
}): Promise<Branches> => {
    const newBranch: Branches = {
        id: Date.now(),
        name: branchData.name,
        address: branchData.address,
        phone: branchData.phone
    }
    
    branch.push(newBranch)

    return structuredClone(newBranch)

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
    id: number,
    branchData: Pick<Branches, "name" | "address" | "phone"> 
): Promise <Branches> =>{
    
    const index: number = branch.findIndex((branch: Branches) => branch.id === id );

    if(index === -1){
        throw new Error (`Branch with ID ${id} does not exist`);
    }

    branch[index] = {
        ...branch[index],
        ...branchData
    };
    
    return structuredClone(branch[index]);
}

/**
 * Deletes a branch from the array
 * @param id The id of the branch to be deleted
 * @throws Error if ID of the branch does not exist
 */
export const deleteBranch = async (id: number): Promise<void> => {

    const index: number = branch.findIndex((branch: Branches) => branch.id === id);

    if (index === -1 ){
        throw new Error (`The branch with ID ${id} does not exist`);
    }

    branch.splice(index, 1)
}