import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Passenger {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string 

    @Column()
    lastName: string 

    @Column()
    email: string

    @Column()
    password: string 

    @Column()
    ResidencyAddress: string
    
    @Column()
    phoneNumber: string

    @CreateDateColumn()
    createdAt: string
}