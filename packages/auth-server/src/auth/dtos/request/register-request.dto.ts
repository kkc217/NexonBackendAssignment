import { Role } from '../../../common/enums/role.enum';

export class RegisterRequestDto {
  loginId: string;
  password: string;
  roles: Role[];
}
