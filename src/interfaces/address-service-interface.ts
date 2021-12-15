export default interface AddressServiceInterface {
    getStudentAddress(id: number): Promise<any>;
    createStudentAddress(address: any): Promise<any>;
    updateStudentAddress(address: any): Promise<any>;
    deleteStudentAddress(id: number): Promise<any>;
}