import { RsGenericHeader } from './generic-header.model';

export interface RsUser {
  rsGenericHeaderDto: RsGenericHeader;
  rsUserDataDto: RsUserData;
}

export interface RsUserData {
  token: string;
}
