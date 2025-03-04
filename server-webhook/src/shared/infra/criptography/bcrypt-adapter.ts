import bcrypt from "bcrypt";
import { Encrypter } from "../../../modules/customer/data/protocols/encrypter";

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }
}
