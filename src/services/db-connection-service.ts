import { Sequelize } from 'sequelize-typescript';
//import { TypeformResponse } from '../models/TypeformResponse';
import { Student } from "../db-models/Student";

import 'mysql2';

export default class DbConnectionService {

    private static instance: Sequelize

    public static async connect(): Promise<Sequelize> {

        if (!this.instance) {

            this.instance = new Sequelize({
                dialect: 'mysql',
                database: process.env.DB_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                port: parseInt(process.env.DB_PORT || '3306'),
                host: process.env.DB_HOST,
                logging: false,
                operatorsAliases: {},
                define: {
                    timestamps: false
                },
                models: [
                    Student
                ]
            });

            //this.instance.models.TypeformResponse.removeAttribute('id');
        }
        return this.instance
    }

}