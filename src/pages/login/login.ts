import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { User } from '../../app/models/user';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    user = {} as User;

    constructor(private afAuth: AngularFireAuth,
      public navCtrl: NavController, public navParams: NavParams,private toast: ToastController) {
        if(localStorage.getItem("email")!= null){
          this.navCtrl.setRoot(HomePage)
        }
    }

  async login(user: User){
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(
          () => {
            localStorage.setItem("email",user.email)
            this.showToast("Success Login")
            this.navCtrl.setRoot(HomePage)
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
  register(){
    this.navCtrl.push('RegisterPage')
  }

  showToast(word : String){
    this.toast.create({
      message:  "" + word,
      duration: 3000
    }).present();
  }
  
}
