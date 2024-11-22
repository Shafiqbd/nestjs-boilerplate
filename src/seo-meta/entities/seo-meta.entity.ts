import { Blog } from 'src/blog/entities/blog.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'seo-meta' })
export class SeoMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  keywords: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  author: string;

  @OneToOne(() => Blog, (blog) => blog.seoMeta, { onDelete: 'CASCADE' })
  @JoinColumn()
  blogs: Blog;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
