import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true})
    email: string;

    @Column()
    @Exclude({ toPlainOnly:true })
    password: string;

    @Column()
    role: string;

}
