import { Attachment } from 'src/attachment/entities/attachment.entity';
import { SeoMeta } from 'src/seo-meta/entities/seo-meta.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'blog' })
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column()
  slug: string;

  @Column({ nullable: true, type: 'text' })
  shortDescription: string;

  @Column({ nullable: true, type: 'longtext' })
  content: string;

  @OneToOne(() => Attachment, (attachment) => attachment.blogs)
  attachment: Attachment;

  @OneToOne(() => SeoMeta, (seo) => seo.blogs)
  seoMeta: SeoMeta;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
