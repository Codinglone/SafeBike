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

    @Column({ default: false })
    isAvailable: boolean;

    @Column({ type: 'point', nullable: true })
    currentLocation: string;

    @Column({ type: 'timestamp', nullable: true })
    lastLocationUpdate: Date;

    @CreateDateColumn({ type: Date })
    createdAt: Date
}