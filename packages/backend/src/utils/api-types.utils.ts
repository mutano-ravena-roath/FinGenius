import { User } from "../user/entities/user.entity";
////////////////////////////////////////////////////////////////////////////////

/** EntityData type is used for storing entity data. */
export type EntityData = { id: number; name: string; phoneNumber?: string };

/**
 * PassportRequest is used to define the shape of the request
 * object after the passport middleware has been applied.
 *
 * @property {User} user - the user object returned from the passport middleware
 * @property {string} ip - the IP address of the request
 */
export interface PassportRequest extends Request {
  user?: User;
  ip: string;
}