import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Teacher extends BaseEntity {
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

  @Column({ default: 'TEACHER' })
  role: string;

  @Column({ default: false })
  isLogged: boolean;

  @Column({ default: true })
  hasPermToCreate: boolean;

  @Column({ default: true })
  hasPermToDelete: boolean;

  @Column({ default: true })
  hasPermToUpdate: boolean;

  @Column({ default: false })
  canSeeBooking: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}