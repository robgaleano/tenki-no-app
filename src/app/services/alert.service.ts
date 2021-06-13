import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async presentAlert(
    alertHeader: string,
    alertMaessage: string,
    buttonArray: any[]
  ): Promise<void> {
    const alert = await this.alertController.create({
      header: alertHeader,
      message: alertMaessage,
      buttons: buttonArray,
    });
    await alert.present();
  }

  async dismissAlert(data?: any): Promise<void> {
    await this.alertController.dismiss(data ? data : null);
  }
}
