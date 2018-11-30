import { Injectable } from "@angular/core";

import { AlertController } from "ionic-angular";

import { groceriesServiceProvider } from "../../providers/groceries-service/groceries-service";

/*
  Generated class for the InputDialogServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServicesProvider {
  constructor(
    public dataService: groceriesServiceProvider,
    public alertCtrl: AlertController
  ) {
    console.log("Hello InputDialogServicesProvider Provider");
  }
 
  showPrompt(item?, index?) {
    let alert = this.alertCtrl.create({
      title: item ? "Edit Item" : "Add Item",
      message: item ? "Please Edit Item ..": "Please Enter Item",
      inputs: [
        {
          name: "name",
          placeholder: "name",
          value: item ? item.name : null
        },
        {
          name: "quanity",
          placeholder: "quanity",
          value: item ? item.quanity : null,
          type: 'select'
        }
      ],
      
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: item => {
            console.log("login clicked + " + JSON.stringify(item));
            if(index !== undefined){
              this.dataService.editItemPrompt(item, index);
            } else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    alert.present();
  }
}
