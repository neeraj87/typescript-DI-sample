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

app.get('/', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let student = await studentService.getStudentProfile(1);
    return res.json({ status: "success", message: "Welcome to API Service", student });
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