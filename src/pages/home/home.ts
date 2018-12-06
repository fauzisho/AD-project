import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../../pages/login/login';


declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
      console.log(localStorage.getItem("email"))
    
      this.loadMap()
  }
  loadMap(){
 
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }
  logoutUser(){
      localStorage.removeItem("email")
      this.navCtrl.setRoot(LoginPage)
  }
}
