import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';
import { Region } from 'src/regions/entities/region.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => Manager)
  @JoinColumn({
    name: 'managerId',
  })
  manager: Manager;

  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({ name: 'regionId' })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  @JoinColumn({ name: 'employeeId' })
  employees: Employee[];
}
