import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'sitemap' })
export class Sitemap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  priority: string;

  @Column()
  lastModified: string;

  @Column({ default: 'monthly' })
  changeFrequency: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
