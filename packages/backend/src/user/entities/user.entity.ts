/* external dependencies */
import { Index, Column, Entity } from "typeorm";

/* utils */
import { SQLBaseEntity } from "../../utils/base-entity.utils";
////////////////////////////////////////////////////////////////////////////////

@Entity()
export class User extends SQLBaseEntity {
  /* --- properties -----------------------------------------------------------*/
  @Column()
  @Index({ unique: true })
  wallet: string;

  /* --- constructor ----------------------------------------------------------*/
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

