export default interface StudentServiceInterface {
    getStudentProfile(id: string): Promise<any>;
    createStudent(student: any): Promise<any>;
    updateStudent(student: any): Promise<any>;
    deleteStudent(id: string): Promise<any>;
}