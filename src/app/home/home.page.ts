import {Component} from '@angular/core';
import {Msal} from 'ionic-msal-native';

const aadOptions: any = {
  authorities: [
    {
      type: 'B2C',
      audience: 'AzureADandPersonalMicrosoftAccount',
      authorityUrl: 'https://tdppocb2c.b2clogin.com/tdppocb2c.onmicrosoft.com/B2C_1A_signup_signin',
      default: true
    }
  ]
  , scopes: ['User.Read']
};


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {


    public jwt = '';

    constructor(private msal: Msal,) {
    }

    aadSignin() {
        // if (this.device.platform !== 'web') {
        this.msal.msalInit(aadOptions).then((initResult) => {
                return initResult;
            },
            (err) => {
                console.log('error result', err);
            })
            .then(() => {
                return this.msal.signInSilent().then(jwt => {
                    return jwt;
                }).catch(x => {
                    return this.msal.signInInteractive();
                });
            })
            .then((jwt) => {
                this.jwt = jwt;
            });
        // }
    }

}
