import { User } from 'src/auth/entities/user.entity';
import { Location } from 'src/locations/entities/location.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;
  @Column('text')
  employeeName: string;

  @Column('text')
  employeeLastName: string;

  @Column('text')
  employeePhoneNumber: string;

  @Column('text')
  employeeEmail: string;

  @Column({ type: 'text', nullable: true })
  employeePhotoUrl: string;

  @ManyToOne(() => Location, (location) => location.employees)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
}
