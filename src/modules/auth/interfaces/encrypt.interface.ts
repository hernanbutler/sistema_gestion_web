export const ENCRYPT_SERVICE = 'ENCRYPT_SERVICE';

export interface IEncrypt {
  encrypt(password: string): Promise<string>;
}
