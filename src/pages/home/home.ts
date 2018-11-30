import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data =>{
      if (data.email && data.uid){
      this.toast.create({
        message: 'welcome to meetMe,', //$data.email doesnt work
        duration: 3000
      }).present();
    }
    else {
      this.toast.create({
        message: 'could not find auth detail',
        duration: 3000
      }).present();

    }
  }
    )
}}
