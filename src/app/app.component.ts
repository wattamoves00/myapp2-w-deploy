import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {Deploy} from '@ionic/cloud-angular';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, public deploy: Deploy) {
    platform.ready().then(() => {
      

      if ( platform.is('cordova') ) this.updateApp();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();


    });
  }
  
  updateApp() {
    this.updateSnapshot();
    setInterval( () => this.updateSnapshot(), 30 * 1000 );
  }
  updateSnapshot() {
    console.log("MyApp::updateSnapshot()");
      this.deploy.check().then( (snapshotAvailable: boolean) => {
        if ( snapshotAvailable ) { 
          this.deploy.download().then( () => { 
            return this.deploy.extract() 
              .then( () => { 
                this.deploy.load();
              } );
          });
        }
      });
  }
}
