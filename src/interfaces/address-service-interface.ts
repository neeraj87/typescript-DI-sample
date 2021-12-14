export default interface AddressServiceInterface {
    getStudentAddress(id: string): Promise<any>;
    createStudentAddress(address: any): Promise<any>;
    updateStudentAddress(address: any): Promise<any>;
    deleteStudentAddress(id: string): Promise<any>;
}