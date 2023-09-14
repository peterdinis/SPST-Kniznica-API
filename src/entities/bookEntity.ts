import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './Category';
import { Author } from './Author'; 
import { Booking } from './Booking';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  externalId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  status: string;

  @Column({ default: 'Mladé Léta' })
  publisher: string;

  @Column()
  pages: number;

  @Column()
  year: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 1 })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.books, { onDelete: 'CASCADE' })
  category: Category;

  @Column()
  authorId: number;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  author: Author;

  @OneToMany(() => Booking, (booking) => booking.book)
  borrowed: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}