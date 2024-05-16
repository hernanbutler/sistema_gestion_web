import { RsGenericHeader } from './generic-header.model';

export interface RsLoginUser {
  rsGenericHeaderDto: RsGenericHeader;
  rsLoginUserDataDto: RsLoginUserData;
}

interface RsLoginUserData {
  token: string;
}
