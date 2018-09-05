import { Component } from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private fb:Facebook, private gg: GooglePlus){

  }

  loginFacebook(){
    this.fb.login(['email'])
    .then((res: FacebookLoginResponse) => console.log("Logged in Facebook", res))
    .catch(err => console.log("Error ",err));
  }

  loginGoogle(){
    this.gg.login({})
    .then(res => console.log(res))
    .catch(err => console.log(err));
    
  }
}
