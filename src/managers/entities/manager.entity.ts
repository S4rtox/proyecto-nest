import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
