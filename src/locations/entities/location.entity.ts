import { Manager } from 'src/managers/entities/manager.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  locationId: string;
  @Column({ type: 'text' })
  locationName: string;
  @Column({ type: 'text' })
  locationAddress: string;
  @Column({ type: 'simple-array' })
  locationLatLng: number[];
}
