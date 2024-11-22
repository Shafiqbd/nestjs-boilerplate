import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Blog } from 'src/blog/entities/blog.entity';

@Entity({ name: 'attachment' })
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  fileType: string;
  @Column()
  path: string;

  @Column()
  mimetype: string;

  @OneToOne(() => Blog, (blog) => blog.attachment, { onDelete: 'CASCADE' })
  @JoinColumn()
  blogs: Blog;

  @Column()
  size: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
