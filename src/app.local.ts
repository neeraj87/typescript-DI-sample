require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';

//import service identifiers
import TYPES from "./utils/types";
import { ContainerFactory } from './factories/container-factory';
import DbConnectionService from './services/db-connection-service';
import StudentServiceInterface from "./interfaces/student-service-interface";

const app: Application = express();

DbConnectionService.connect();

app.use(express.json());

app.get('/:id', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let result = await studentService.getStudentProfile(+req.params.id);
    return res.json({ status: "success", message: "Welcome to API Service", result });
});

app.post('/', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let result = await studentService.createStudent(req.body)
    return res.json({ status: "success", result });
});

app.patch('/:id', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let result = await studentService.updateStudent(+req.params.id, req.body);
    return res.json({ status: "success", result });
});

app.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let result = await studentService.deleteStudent(+req.params.id)
    return res.json({ status: "success", result });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Route Not found");
    next(error);
});

app.use((error: { message: string; status: number }, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
        status: "error",
        message: error.message
    });
    next();
});



const PORT: any = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));