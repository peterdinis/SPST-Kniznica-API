import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'FOO' })
  name: string;

  @Column({ default: 'FOO' })
  lastName: string;

  @Column({ unique: true, default: 'FOO' })
  username: string;

  @Column({ unique: true, default: 'foo@gmail.com' })
  email: string;

  @Column()
  password: string;

  @Column('bytea', { nullable: true })
  picture: Buffer | null;

  @Column({ default: false })
  isLogged: boolean;

  @Column({ default: 'STUDENT' })
  role: string;

  @Column({ default: '1.A' })
  classRoom: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}