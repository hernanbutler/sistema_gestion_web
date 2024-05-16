import { RsGenericHeader } from './generic-header.model';

export interface RsUser {
  rsGenericHeaderDto: RsGenericHeader;
  rsUserDataDto: RsUserData;
}

interface RsUserData {
  token: string;
}
