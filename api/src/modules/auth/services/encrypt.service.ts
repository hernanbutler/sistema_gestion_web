import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { IEncrypt } from "../interfaces";

@Injectable()
export class EncryptService implements IEncrypt {
  async encrypt(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted);
  }
}
