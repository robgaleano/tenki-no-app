import { Injectable } from '@angular/core';
import { EncryptDecryptService } from '@services/encrypt-decrypt.service';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private encryptDecrypt: EncryptDecryptService) { }

  public async setItem(storageKey: string, value: any) {
    // Encrypt token before saving
    // AES Encryption
    const encryptedValue = this.encryptDecrypt.encrypt('tenkinoapp#$@ROB', escape(JSON.stringify(value)));
    // Base64 Encryption
    // const encryptedValue = btoa(escape(JSON.stringify(value)));
    // Save token
    await Storage.set({
      key: storageKey,
      value: encryptedValue,
    });
  }

  public async getItem(storageKey: string) {
    // Get Token
    const storedItem = await Storage.get({ key: storageKey });
    // If storedItem exists
    if (storedItem && storedItem.value) {
      // Base64 Decryption
      // return JSON.parse(unescape(atob(storedItem.value)));
      // AES Decryption
      return JSON.parse(unescape(this.encryptDecrypt.decrypt('tenkinoapp#$@ROB', storedItem.value)));
    } else {
      return false;
    }
  }

  public async removeItem(storageKey: string) {
    await Storage.remove({ key: storageKey });
  }

  public getAllStorageKeys() {
    return Storage.keys();
  }

  public async clearItems() {
    await Storage.clear();
  }
}
