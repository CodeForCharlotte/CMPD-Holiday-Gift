import Affiliation from './affiliation';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import Household from './household';
import AbstractUser from './abstract/user'

@Entity('users')
export default class Nominator extends AbstractUser {
  private constructor(props) {
    super();

    Object.assign(this, props);
  }

  @OneToOne(() => Affiliation)
  @JoinColumn({ name: 'affiliation_id' })
  affiliation: Affiliation 

  @Column('int', {name: 'nomination_limit', default: 5})
  nominationLimit: number

  @OneToMany(() => Household, household => household.nominator)
  households: Household[]
}