import {Column, CreateDateColumn, Entity, PrimaryColumn,} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly name: string;

  @Column()
  readonly password: string;

  @Column()
  readonly age: number;

  @Column()
  readonly email: string;

  @Column()
  readonly department: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}