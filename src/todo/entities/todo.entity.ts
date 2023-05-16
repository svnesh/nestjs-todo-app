import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type:'text', nullable:false })
    title: string

    @Column({ type:'timestamp', default: ()=> "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type:'boolean', default:false })
    completed: boolean

    @Column({ type:'timestamp', default: null })
    updatedAt: Date

    @Column({ type:'text', nullable:true})
    description: string

    @ManyToOne(() => User, (user:User) => user.id, { eager: true, nullable: false })
    @JoinColumn({ name:'createdBy' })
    createdBy: User

}
