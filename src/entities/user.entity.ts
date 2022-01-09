import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    readonly id: string;

    @Column()
    readonly name: string;

    @Column()
    readonly password: string;

    @Column()
    readonly email: string;

    @Column()
    readonly department: string;
}