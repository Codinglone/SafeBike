import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rider {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string 

    @Column()
    lastName: string 

    @Column()
    email: string

    @Column()
    plateNumber: string

    @Column()
    password: string 

    @Column()
    ResidencyAddress: string
    
    @Column()
    phoneNumber: string

    @CreateDateColumn({ type: Date })
    createdAt: Date
}