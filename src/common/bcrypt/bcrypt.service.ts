import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  checkEncryptedData(dataToBeChecked, encryptControlData): Promise<boolean> {
    return bcrypt.compare(dataToBeChecked, encryptControlData);
  }

  hash(password: string): Promise<String> {
    return bcrypt.hash(password, 10);
  }
}
