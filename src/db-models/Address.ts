import { injectable } from "inversify";
import {Model, Table, Column, HasMany, PrimaryKey} from 'sequelize-typescript';

@Table({
    tableName: 'student_addresses'
})

@injectable()
export class Address extends Model {
    @PrimaryKey
    @Column id: string;
    @Column street: string;
    @Column city: string;
    @Column state: string;
    @Column zip_postal_code: string;
    @Column studentId: string;
}