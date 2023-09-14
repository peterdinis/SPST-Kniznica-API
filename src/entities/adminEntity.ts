import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Admin extends BaseEntity {
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

  @Column({ default: true })
  hasPermToCreate: boolean;

  @Column({ default: false })
  isLogged: boolean;

  @Column({ default: 1000 })
  specialCode: number;

  @Column({ default: true })
  hasPermToDelete: boolean;

  @Column({ default: true })
  hasPermToUpdate: boolean;

  @Column({ default: true })
  canSeeBookings: boolean;

  @Column({ default: 'ADMIN' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  imageTitle: string | null;

  @Column({ nullable: true })
  image: string | null;
}