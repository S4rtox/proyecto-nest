import { Location } from 'src/locations/entities/location.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn('uuid')
  regionId: string;

  @Column({ type: 'text', unique: true })
  regionName: string;

  @Column({ type: 'simple-array' })
  regionStates: string[];

  @OneToMany(() => Location, (location) => location.region)
  locations: Location[];
}
