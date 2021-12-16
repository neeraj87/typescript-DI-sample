import { injectable } from "inversify";
import {Model, Table, Column, HasMany, PrimaryKey} from 'sequelize-typescript';

@Table({
    tableName: 'students'
})

@injectable()
export class Student extends Model {
    @PrimaryKey
    @Column id: string;
    @Column first_name: string;
    @Column last_name: string;
    @Column dateOfBirth: Date;
}