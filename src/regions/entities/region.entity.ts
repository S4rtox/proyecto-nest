import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn('uuid')
  regionId: string;

  @Column({ type: 'text', unique: true })
  regionName: string;

  @Column({ type: 'array' })
  regionStates: string[];
}
