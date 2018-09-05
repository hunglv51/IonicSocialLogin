import { Component } from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoggedIn:boolean;
  name:string;
  email:string;
  loginType:string;
  constructor(private fb:Facebook, private gg: GooglePlus, private http: HttpClient){

  }

  loginFacebook(){
    this.fb.login(['email'])
    .then((res: FacebookLoginResponse) => {
      console.log("Logged in Facebook", res);
      this.isLoggedIn = true;
      this.loginType = 'fb';
      this.getFacebookData(res.authResponse.accessToken);
    })
    .catch(err => console.log("Error ",err));
  }

  loginGoogle(){
    this.gg.login({})
    .then(res => {
      console.log(res);
      this.isLoggedIn = true;

    })
    .catch(err => console.log(err));
    
  }
  getFacebookData(access_token:string){
    let url = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + access_token;
    this.http.get(url).subscribe(data =>{
      this.name = data["name"];
      this.email = data["email"];
      console.log(data);
      
    })
  }
  logOut()
  {
    switch(this.loginType){
      case "fb":
      this.logOutFacebook();
      break;
      default:
      this.loginGoogle();    
    } 
  }
  logOutFacebook(){
    this.fb.logout()
    .then(rs => {
      // console.log(rs);
      this.isLoggedIn = false;
    })
    .catch(err=> console.log(err));
    
  }
  logOutGoogle(){

  }
}
