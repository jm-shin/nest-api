import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly username: string;

  @Exclude()
  @Column()
  @ApiHideProperty()
  readonly password: string;

  @Column()
  readonly email: string;

  @Column()
  readonly department: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
