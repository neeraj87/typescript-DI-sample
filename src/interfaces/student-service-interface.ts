export default interface StudentServiceInterface {
    getStudentProfile(id: number): Promise<any>;
    createStudent(student: any): Promise<any>;
    updateStudent(student: any): Promise<any>;
    deleteStudent(id: number): Promise<any>;
}