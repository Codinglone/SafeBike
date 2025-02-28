import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Passenger } from "./Passenger";
import { Rider } from "./Rider";

export enum PackageStatus {
    PENDING = "pending",         
    ACCEPTED = "accepted",       
    PICKED_UP = "picked_up",   
    IN_TRANSIT = "in_transit",
    DELIVERED = "delivered",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled"
}

@Entity()
export class Package {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Passenger)
    @JoinColumn()
    sender: Passenger;

    @ManyToOne(() => Passenger)
    @JoinColumn()
    recipient: Passenger;

    @ManyToOne(() => Rider, { nullable: true })
    @JoinColumn()
    rider: Rider;

    @Column()
    recipientName: string;

    @Column()
    recipientPhone: string;

    @Column()
    pickupLocation: string;

    @Column()
    deliveryLocation: string;

    @Column()
    description: string;

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    estimatedValue: number;

    @Column({
        type: "enum",
        enum: PackageStatus,
        default: PackageStatus.PENDING
    })
    status: PackageStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: "timestamp", nullable: true })
    pickedUpAt: Date;

    @Column({ type: "timestamp", nullable: true })
    deliveredAt: Date;

    @Column({ type: "timestamp", nullable: true })
    confirmedAt: Date;
}