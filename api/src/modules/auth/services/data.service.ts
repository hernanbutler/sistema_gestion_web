import { Injectable } from "@nestjs/common";

import { UserEntity } from "@modules/auth/entities";

@Injectable()
export class DataService {
  private user: UserEntity;

  set userData(value: UserEntity) {
    this.user = value;
  }
  get userData() {
    return this.user;
  }
}
