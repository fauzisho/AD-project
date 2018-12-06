import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { User } from './../../app/models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../../pages/login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user ={} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,) {
  }

  async register(user: User){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(
        () => {
          this.showToast("Success Register")       
          this.navCtrl.setRoot(LoginPage)   
        },
        error => console.log(error)
      )
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        this.showToast(errorMessage)  
      });
    }
    catch(e){
      console.error(e);
    }
  }

  showToast(word : String){
    this.toast.create({
      message:  "" + word,
      duration: 3000
    }).present();
  }
  
}
