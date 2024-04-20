import { SetMetadata } from "@nestjs/common";
////////////////////////////////////////////////////////////////////////////////

/**
 * AllowAnon Guard permits anonymous users to access the route.
 * @see https://docs.nestjs.com/security/authentication#enable-authentication-globally
 */
export const AllowAnon = () => SetMetadata("isPublic", true);
