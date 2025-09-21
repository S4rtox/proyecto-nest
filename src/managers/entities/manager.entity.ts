import { Location } from 'src/locations/entities/location.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  managerId: string;

  @Column({ type: 'text' })
  managerFullName: string;

  @Column({ type: 'float' })
  managerSalary: number;

  @Column({ type: 'text' })
  managerEmail: string;

  @Column({ type: 'text' })
  managerPhoneNumber: string;

  @OneToOne(() => Location, (location) => location.locationId, { eager: true })
  location: Location;
}
