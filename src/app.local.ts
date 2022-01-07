require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';

//import service identifiers
import TYPES from "./utils/types";
import { ContainerFactory } from './factories/container-factory';
import DbConnectionService from './services/db-connection-service';
import StudentServiceInterface from "./interfaces/student-service-interface";
import WeatherAPIServiceInterface from "./interfaces/weather-api-service-interface";

const app: Application = express();

DbConnectionService.connect();

app.use(express.json());

app.get('/student/:id', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let result = await studentService.getStudentProfile(+req.params.id);
    return res.json({ status: "success", result });
});

app.post('/student', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let result = await studentService.createStudent(req.body)
    return res.json({ status: "success", result });
});

app.patch('/student/:id', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let result = await studentService.updateStudent(+req.params.id, req.body);
    return res.json({ status: "success", result });
});

app.delete('/student/:id', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const studentService = container.get<StudentServiceInterface>(TYPES.StudentService);
    let result = await studentService.deleteStudent(+req.params.id)
    return res.json({ status: "success", result });
});

app.get('/weather', async (req: Request, res: Response): Promise<any> => {
    const container = ContainerFactory.getContainer();
    const weatherService = container.get<WeatherAPIServiceInterface>(TYPES.WeatherService);
    let city = req.query.city;
    let result = await weatherService.getCurrentWeather(city);
    return res.send({ status: "success", result });
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